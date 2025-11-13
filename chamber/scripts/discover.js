// scripts/discover.js

// ✅ Load the JSON data directly
fetch("../data/discover.json")
  .then((response) => response.json())
  .then((placesData) => {
    displayPlaces(placesData);
  })
  .catch((error) => {
    console.error("Error loading discover.json:", error);
  });

const visitMsg = document.getElementById("visit-msg");
const discoverContainer = document.getElementById("discover-container");

// ✅ Visit message
function updateVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    visitMsg.textContent = "Welcome! This is your first visit.";
  } else {
    const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    visitMsg.textContent =
      daysSince === 0
        ? "Welcome back! You visited earlier today."
        : `Back after ${daysSince} day${daysSince > 1 ? "s" : ""}! Great to see you again.`;
  }

  localStorage.setItem("lastVisit", now);
}

// ✅ Display Discover cards
function displayPlaces(placesData) {
  discoverContainer.innerHTML = ""; // Clear previous

  placesData.forEach((place) => {
    const card = document.createElement("div");
    card.classList.add("discover-card");

    card.innerHTML = `
      <h3>${place.name}</h3>
      <img src="${place.image}" alt="${place.name}">
      <p><em>${place.address}</em></p>
      <p>${place.description}</p>
      <a href="#" class="learn-more">Learn More</a>
    `;

    discoverContainer.appendChild(card);
  });
}

// ✅ Initialize visit message
updateVisitMessage();

// ✅ Update footer year
document.getElementById("year").textContent = new Date().getFullYear();
