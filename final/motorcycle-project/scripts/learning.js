const container = document.getElementById('tips-container');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.getElementById('close-modal');

// Load tips dynamically
async function loadTips() {
  try {
    const response = await fetch('../data/tips.json');
    const tips = await response.json();

    tips.forEach((tip, index) => {
      const card = document.createElement('div');
      card.classList.add('tip-card');
      card.innerHTML = `
        <img src="${tip.image}" alt="${tip.title}">
        <h3>${tip.title}</h3>
        <p>${tip.category}</p>
        <button class="more-btn" data-index="${index}">Read More</button>
      `;
      container.appendChild(card);
    });

    // Save to local storage (just an example)
    localStorage.setItem('tipsLoaded', true);

    // Add modal open event
    document.querySelectorAll('.more-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tip = tips[e.target.dataset.index];
        modalTitle.textContent = tip.title;
        modalImage.src = tip.image;
        modalDescription.textContent = tip.description;
        modal.style.display = 'block';
      });
    });
  } catch (error) {
    console.error('Error loading tips:', error);
  }
}

// Close modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

loadTips();
