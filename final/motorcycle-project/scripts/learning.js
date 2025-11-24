async function loadTips() {
  try {
    const response = await fetch("./data/tips.json");
    if (!response.ok) {
      throw new Error("Failed to load tips data");
    }
    const tips = await response.json();
    displayTips(tips);
  } catch (error) {
    console.error("Error loading tips:", error);
  }
}

function displayTips(tips) {
  const container = document.getElementById("tips-container");
  container.innerHTML = "";

  tips.forEach(tip => {
    const card = document.createElement("div");
    card.classList.add("tip-card");
    card.innerHTML = `
      <img src="images/${tip.image}" alt="${tip.title}">
      <h3>${tip.title}</h3>
      <p>${tip.category}</p>
      <button class="read-more">Read More</button>
    `;
    container.appendChild(card);

    // Only open modal when "Read More" is clicked
    const button = card.querySelector(".read-more");
    button.addEventListener("click", () => showModal(tip));
  });
}

function showModal(tip) {
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

  // Close when clicking the X
  modal.querySelector(".close").addEventListener("click", () => modal.remove());

  // Close when clicking outside the modal box
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.remove();
  });
}

// Run everything after DOM is ready
document.addEventListener("DOMContentLoaded", loadTips);
