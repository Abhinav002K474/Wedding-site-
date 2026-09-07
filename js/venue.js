/**
 * Scene 06: The Wedding Sanctuary & Venue Manuscript Interactions
 */
class VenueManager {
  constructor() {
    this.revealBtn = document.getElementById('reveal-coords-btn');
    this.coordsPanel = document.getElementById('coords-panel');
    this.isOpen = false;

    this.init();
  }

  init() {
    if (!this.revealBtn || !this.coordsPanel) return;

    this.revealBtn.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      this.coordsPanel.classList.toggle('is-open', this.isOpen);

      const btnText = this.revealBtn.querySelector('.btn-text');
      if (btnText) {
        btnText.textContent = this.isOpen ? 'Conceal Coordinates' : 'Reveal Coordinates & Map';
      }

      if (window.magicalAudio) {
        window.magicalAudio.playParchmentRustle();
        window.magicalAudio.playChime(620, 0.6);
      }

      if (this.isOpen && window.skyParticles) {
        const rect = this.revealBtn.getBoundingClientRect();
        window.skyParticles.spawnTouchBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.venueManager = new VenueManager();
});
