/*
 Simple client-side analysis: parse symptoms, compute a heuristic risk score,
 show loading state, then render accessible results. This is a mock — replace
 with server/model call when ready.
*/

(function () {
    const form = document.getElementById('aiDetectionForm');
    const symptomsInput = document.getElementById('symptoms');
    const locationInput = document.getElementById('location');
    const loadingEl = document.getElementById('loading');
    const resultSection = document.getElementById('result-section');
    const outputEl = document.getElementById('analysis-output');
    const riskEl = document.getElementById('risk-level');
    const resetBtn = document.getElementById('aiReset');

    // keyword weights for a simple heuristic (mock)
    const KEYWORDS = {
        fever: 25, cough: 15, breath: 30, "shortness of breath": 30,
        "loss of smell": 30, anosmia: 30, fatigue: 10, headache: 8,
        sore: 10, diarrhea: 8, vomiting: 10, chest: 25, "chest pain": 30,
        chills: 12, nausea: 8
    };

    function sanitize(s) { return (s || '').toString().trim(); }

    function computeRisk(symptomsText) {
        const s = symptomsText.toLowerCase();
        let score = 0;
        Object.keys(KEYWORDS).forEach(k => { if (s.includes(k)) score += KEYWORDS[k]; });
        if (s.length && score < 5) score = 5;
        return Math.min(Math.round(score), 100);
    }

    function riskLabelFromScore(score) {
        if (score >= 70) return { label: 'High', className: 'high', advice: 'Seek immediate clinical evaluation.' };
        if (score >= 35) return { label: 'Medium', className: 'medium', advice: 'Monitor closely and consider consulting a clinician.' };
        return { label: 'Low', className: 'low', advice: 'Low likelihood of severe findings; continue monitoring.' };
    }

    function showLoading(on = true) {
        if (!loadingEl) return;
        loadingEl.classList.toggle('hidden', !on);
        loadingEl.setAttribute('aria-hidden', (!on).toString());
    }

    function showResultsSection(show = true) {
        if (!resultSection) return;
        resultSection.classList.toggle('hidden', !show);
        resultSection.setAttribute('aria-hidden', (!show).toString());
        if (show) {
            resultSection.focus({ preventScroll: true });
        }
    }

    function resetUI() {
        showLoading(false);
        showResultsSection(false);
        outputEl.textContent = 'Enter symptoms to receive AI analysis.';
        riskEl.className = 'risk-box hidden';
        riskEl.setAttribute('aria-hidden', 'true');
    }

    function setOutputText(text) {
        outputEl.textContent = text;
    }

    async function analyzeSymptoms() {
        const symptoms = sanitize(symptomsInput?.value);
        const location = sanitize(locationInput?.value);

        if (!symptoms) {
            setOutputText('Please enter symptoms to analyze.');
            showResultsSection(true);
            return;
        }
        if (!location) {
            setOutputText('Please enter a location.');
            showResultsSection(true);
            return;
        }

        // UI state
        showResultsSection(false);
        showLoading(true);

        // simulate async model call
        await new Promise(r => setTimeout(r, 800 + Math.random() * 700));

        const score = computeRisk(symptoms);
        const risk = riskLabelFromScore(score);

        const outLines = [
            `Location: ${location}`,
            `Symptoms provided: ${symptoms}`,
            `Estimated risk level: ${risk.label} (${score}%)`,
            risk.advice
        ];
        setOutputText(outLines.join('\n\n'));

        // update risk box
        riskEl.className = 'risk-box ' + risk.className;
        riskEl.textContent = `${risk.label} — ${score}%`;
        riskEl.setAttribute('aria-hidden', 'false');

        showLoading(false);
        showResultsSection(true);
    }

    // wire form submit (preferred) and reset button
    form && form.addEventListener('submit', (e) => {
        e.preventDefault();
        analyzeSymptoms().catch(err => {
            console.error(err);
            setOutputText('An error occurred during analysis.');
            showLoading(false);
            showResultsSection(true);
        });
    });

    resetBtn && resetBtn.addEventListener('click', () => {
        form.reset();
        resetUI();
        symptomsInput?.focus();
    });

    // initialize
    resetUI();

    // expose for debugging if needed
    window.analyzeSymptoms = analyzeSymptoms;
})();
