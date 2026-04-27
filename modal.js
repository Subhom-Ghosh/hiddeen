// ═══════════════════════════════════════════
//  MODAL — Item Selection & Purchase Flow
// ═══════════════════════════════════════════

const modal = document.getElementById('itemModal');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');
const buyNowBtn = document.getElementById('buyNowBtn');
const subCards = document.querySelectorAll('.sub-card');

// Open modal when card is clicked
subCards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('.sub-card-body h3').textContent;
    modalTitle.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
  });
});

// Close modal function
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Restore scroll
}

// Close modal on close button click
modalClose.addEventListener('click', closeModal);

// Close modal on overlay click
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// Buy Now button action
buyNowBtn.addEventListener('click', () => {
  const itemName = modalTitle.textContent;
  alert(`Thank you for your interest in ${itemName}!\n\nProceeding to checkout...`);
  closeModal();
  // You can replace this with actual checkout logic or redirect to a payment page
});
