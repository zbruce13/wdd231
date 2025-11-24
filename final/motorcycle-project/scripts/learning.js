document.addEventListener("DOMContentLoaded", () => {
  const tipsContainer = document.getElementById("tips-container");

  fetch("data/tips.json")
    .then((response) => response.json())
    .then((tips) => {
      tips.forEach((tip) => {
        const card = document.createElement("div");
        card.classList.add("tip-card");
        card.innerHTML = `
          <img src="images/${tip.image}" alt="${tip.title}">
          <h3>${tip.title}</h3>
          <p>${tip.category}</p>
          <button class="read-more">Read More</button>
        `;
        card.querySelector(".read-more").addEventListener("click", () => {
          showModal(tip);
        });
        tipsContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Error loading tips:", error));
});

function showModal(tip) {
  // Remove any existing modal before creating a new one
  const existingModal = document.querySelector(".modal");
  if (existingModal) existingModal.remove();

  // Create modal structure
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

  // Add close functionality
  modal.querySelector(".close").addEventListener("click", () => modal.remove());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}
