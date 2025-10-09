// Navigation Toggle for Mobile View
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.createElement("button");
    menuToggle.innerText = "☰ Menu";
    menuToggle.classList.add("menu-toggle");
    document.querySelector("header").appendChild(menuToggle);

    const navList = document.querySelector("nav ul");
    menuToggle.addEventListener("click", function () {
        navList.classList.toggle("show");
    });
});

// Smooth Hero Section Animation
window.addEventListener("load", function () {
    document.querySelector(".hero h2").classList.add("fade-in");
    document.querySelector(".hero p").classList.add("fade-in");
    document.querySelector(".hero img").classList.add("fade-in");
});

// Dummy AI Status Updates
const statusMessages = [
    "Scanning health records...",
    "Analyzing symptoms...",
    "Checking recent outbreak trends...",
    "Cross-referencing with WHO data...",
    "No immediate threats detected."
];

let statusIndex = 0;
function updateAIStatus() {
    document.getElementById("ai-status").innerText = statusMessages[statusIndex];
    statusIndex = (statusIndex + 1) % statusMessages.length;
}

if (document.getElementById("ai-status")) {
    setInterval(updateAIStatus, 3000); // Updates every 3 seconds
}
