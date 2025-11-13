// scripts/discover.js

const visitMsg = document.getElementById("visit-msg");
const discoverContainer = document.getElementById("discover-container");

// Track visits
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitMsg.textContent = "Welcome! This is your first visit!";
} else {
  const daysSince = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
  visitMsg.textContent = daysSince === 0
    ? "Welcome back! You visited today."
    : `Welcome back! It's been ${daysSince} day${daysSince > 1 ? "s" : ""} since your last visit.`;
}

localStorage.setItem("lastVisit", now);

// Fetch discover data
fetch("data/discover.json")
  .then(response => {
    if (!response.ok) throw new Error("Failed to load discover data");
    return response.json();
  })
  .then(data => {
    discoverContainer.innerHTML = data.map(place => `
      <div class="discover-card">
        <img src="${place.image}" alt="${place.name}">
        <h3>${place.name}</h3>
        <p><em>${place.address}</em></p>
        <p>${place.description}</p>
      </div>
    `).join("");
  })
  .catch(error => {
    console.error(error);
    discoverContainer.innerHTML = "<p>Failed to load places. Please try again later.</p>";
  });

// Display current year
document.getElementById("year").textContent = new Date().getFullYear();
