import { places } from "../data/discover.mjs";

const grid = document.getElementById("discover-grid");
const visitMsg = document.getElementById("visit-message");

// Visitor message logic
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitMsg.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (daysSince < 1) {
    visitMsg.textContent = "Back so soon! Awesome!";
  } else if (daysSince === 1) {
    visitMsg.textContent = "You last visited 1 day ago.";
  } else {
    visitMsg.textContent = `You last visited ${daysSince} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);

// Build cards
places.forEach(place => {
  const card = document.createElement("div");
  card.classList.add("discover-card");

  card.innerHTML = `
    <h3>${place.name}</h3>
    <figure>
      <img src="images/${place.image}" alt="${place.name}" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button>Learn More</button>
  `;

  grid.appendChild(card);
});
