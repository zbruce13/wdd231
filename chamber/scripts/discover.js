import { places } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("discover-container");

  // Display cards dynamically
  places.forEach(place => {
    const card = document.createElement("div");
    card.classList.add("discover-card");

    card.innerHTML = `
      <h3>${place.name}</h3>
      <img src="${place.image}" alt="${place.name}" loading="lazy">
      <p><em>${place.address}</em></p>
      <p>${place.description}</p>
      <a href="#" class="learn-more">Learn More</a>
    `;

    container.appendChild(card);
  });

  // Visit Message Logic
  const visitMessage = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! This is your first visit.";
  } else {
    const daysPassed = Math.floor((Date.now() - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysPassed === 0) visitMessage.textContent = "Back so soon! Awesome!";
    else if (daysPassed === 1) visitMessage.textContent = "You last visited 1 day ago.";
    else visitMessage.textContent = `You last visited ${daysPassed} days ago.`;
  }

  localStorage.setItem("lastVisit", Date.now());
  document.getElementById("year").textContent = new Date().getFullYear();
});
