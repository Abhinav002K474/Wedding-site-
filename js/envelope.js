/**
 * Scene 02: The Invitation — 3D Wax Seal Cracking & Parchment Unfolding
 */
class EnvelopeSceneManager {
  constructor() {
    this.envelope = document.getElementById('physical-envelope');
    this.waxSeal = document.getElementById('wax-seal');
    this.cracksEl = document.getElementById('seal-cracks');
    this.openJourneyBtn = document.getElementById('open-journey-trigger');
    this.isOpen = false;

    this.init();
  }

  init() {
    if (!this.waxSeal || !this.envelope) return;

    // Wax seal click/touch
    this.waxSeal.addEventListener('pointerdown', (e) => this.openEnvelope(e));
    this.waxSeal.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.openEnvelope(e);
      }
    });

    // Continue button inside letter
    if (this.openJourneyBtn) {
      this.openJourneyBtn.addEventListener('click', () => {
        if (window.magicalAudio) {
          window.magicalAudio.playChime(784, 1.2);
        }
        const scene3 = document.getElementById('scene-03');
        if (scene3) {
          scene3.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  openEnvelope(e) {
    if (this.isOpen) return;
    this.isOpen = true;

    // Trigger crack sound & tactile chime
    if (window.magicalAudio) {
      window.magicalAudio.playWaxCrack();
      setTimeout(() => window.magicalAudio.playParchmentRustle(), 300);
      setTimeout(() => window.magicalAudio.playChime(880, 1.6), 800);
    }

    // Spark wax and gold particles at seal location
    if (window.skyParticles) {
      const rect = this.waxSeal.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      window.skyParticles.spawnTouchBurst(x, y, 25, true);
    }

    // Add open class to envelope to trigger CSS 3D flap rotation and letter slide
    this.envelope.classList.add('is-open');

    // Mobile haptic vibration if supported
    if (navigator.vibrate) {
      navigator.vibrate([40, 60, 80]);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.envelopeManager = new EnvelopeSceneManager();
});
