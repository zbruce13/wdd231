document.addEventListener("DOMContentLoaded", () => {
  const tipsContainer = document.getElementById("tips-container");

  // Load data from JSON file
  fetch("data/tips.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load JSON");
      return response.json();
    })
    .then(tips => {
      tipsContainer.innerHTML = "";

      tips.forEach(tip => {
        const card = document.createElement("div");
        card.classList.add("tip-card");
        card.innerHTML = `
          <img src="images/${tip.image}" alt="${tip.title}">
          <h3>${tip.title}</h3>
          <p>${tip.category}</p>
          <button class="read-more">Read More</button>
        `;
        tipsContainer.appendChild(card);

        const button = card.querySelector(".read-more");
        button.addEventListener("click", () => showModal(tip));
      });
    })
    .catch(error => {
      tipsContainer.innerHTML = "<p>Sorry, tips could not be loaded.</p>";
      console.error(error);
    });
});

function showModal(tip) {
  // Remove any existing modal
  const existing = document.querySelector(".modal");
  if (existing) existing.remove();

  // Create modal
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img src="images/${tip.image}" alt="${tip.title}">
      <h2>${tip.title}</h2>
      <p><strong>Category:</strong> ${tip.category}</p>
      <p>${tip.description}</p>
    </div>
  `;
  document.body.appendChild(modal);

  // Close events
  modal.querySelector(".close").addEventListener("click", () => modal.remove());
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.remove();
  });
}
