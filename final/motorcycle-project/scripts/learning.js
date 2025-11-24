// learning.js
document.addEventListener("DOMContentLoaded", () => {
  const tipsContainer = document.getElementById("tips-container");

  async function loadTips() {
    try {
      // ✅ Works on both local and GitHub Pages
      const response = await fetch("./data/tips.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const tips = await response.json();

      // Clear container
      tipsContainer.innerHTML = "";

      // Create cards for each tip
      tips.forEach((tip) => {
        const card = document.createElement("div");
        card.classList.add("tip-card");
        card.innerHTML = `
          <img src="${tip.image}" alt="${tip.title}">
          <h3>${tip.title}</h3>
          <p>${tip.category}</p>
          <button class="read-more">Read More</button>
        `;
        tipsContainer.appendChild(card);

        // Modal functionality
        const button = card.querySelector(".read-more");
        button.addEventListener("click", () => showModal(tip));
      });
    } catch (error) {
      console.error("Error loading tips:", error);
      tipsContainer.innerHTML =
        "<p>Sorry, we couldn’t load the motorcycle tips right now.</p>";
    }
  }

  // Create a modal
  function showModal(tip) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>${tip.title}</h2>
        <img src="${tip.image}" alt="${tip.title}">
        <p><strong>Category:</strong> ${tip.category}</p>
        <p>${tip.description}</p>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector(".close");
    closeBtn.addEventListener("click", () => modal.remove());

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  loadTips();
});
