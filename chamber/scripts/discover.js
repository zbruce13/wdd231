// scripts/discover.js
// Script for the Discover page – dynamically loads cards and displays last-visit message

import { places } from "../data/discover.mjs";

// --------- CARD GENERATION ---------
const grid = document.querySelector("#discover-grid");

places.forEach(place => {
  const card = document.createElement("section");
  card.classList.add("discover-card");

  card.innerHTML = `
    <h3>${place.name}</h3>
    <figure>
      <img src="${place.image}" alt="${place.name}" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button type="button">Learn More</button>
  `;

  grid.appendChild(card);
});

// --------- LOCAL STORAGE VISIT MESSAGE ---------
const messageContainer = document.querySelector("#visit-message");
const now = Date.now();
const lastVisit = Number(localStorage.getItem("lastVisit"));

if (!lastVisit) {
  // First visit
  messageContainer.textContent = "Welcome! Let us know if you have any questions.";
} else {
  // Calculate time difference in days
  const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

  if (daysSince < 1) {
    messageContainer.textContent = "Back so soon! Awesome!";
  } else if (daysSince === 1) {
    messageContainer.textContent = "You last visited 1 day ago.";
  } else {
    messageContainer.textContent = `You last visited ${daysSince} days ago.`;
  }
}

// Save the current date for next visit
localStorage.setItem("lastVisit", now);
