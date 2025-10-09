document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("subscriptionForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let plan = document.getElementById("plan").value;

        if (!name || !email || !plan) {
            alert("⚠️ Please fill in all fields!");
            return;
        }

        alert(`🎉 Subscription Successful!\n\nName: ${name}\nEmail: ${email}\nPlan: ${plan.toUpperCase()}`);
    });
});
