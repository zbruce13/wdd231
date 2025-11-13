import { places } from '../data/discover.mjs';

const container = document.querySelector("#discover-container");
const message = document.querySelector("#visit-message");

// Visit tracking
const lastVisit = localStorage.getItem("lastVisit");
if (lastVisit) {
  const days = Math.floor((Date.now() - parseInt(lastVisit, 10)) / (1000 * 60 * 60 * 24));
  message.textContent =
    days === 0
      ? "Welcome back! You visited today."
      : `Back so soon! It’s been ${days} day${days > 1 ? "s" : ""} since your last visit.`;
} else {
  message.textContent = "Welcome! This is your first visit.";
}
localStorage.setItem("lastVisit", Date.now().toString());

// Load places
places.forEach(place => {
  const card = document.createElement("div");
  card.classList.add("discover-card");
  card.innerHTML = `
    <img src="${place.image}" alt="${place.name}">
    <h3>${place.name}</h3>
    <p><em>${place.address}</em></p>
    <p>${place.description}</p>
  `;
  container.appendChild(card);
});
