/**
 * Scene 07: The Astronomical Countdown & Interactive Astrolabe Clock
 */
class AstrolabeManager {
  constructor() {
    this.container = document.getElementById('astrolabe-mechanism');
    this.daysEl = document.getElementById('cd-days');
    this.hoursEl = document.getElementById('cd-hours');
    this.minEl = document.getElementById('cd-minutes');
    this.secEl = document.getElementById('cd-seconds');

    // Wedding Target: October 24, 2026 16:30:00 GMT+1
    this.targetDate = new Date('2026-10-24T16:30:00+01:00').getTime();

    this.isDragging = false;
    this.lastAngle = 0;
    this.currentRotation = 0;

    this.init();
  }

  init() {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);

    if (!this.container) return;

    // Interactive spin manipulation
    this.container.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('pointerup', () => this.onPointerUp());
  }

  updateCountdown() {
    const now = new Date().getTime();
    const diff = Math.max(0, this.targetDate - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (this.daysEl) this.daysEl.textContent = String(days).padStart(3, '0');
    if (this.hoursEl) this.hoursEl.textContent = String(hours).padStart(2, '0');
    if (this.minEl) this.minEl.textContent = String(minutes).padStart(2, '0');
    if (this.secEl) this.secEl.textContent = String(seconds).padStart(2, '0');
  }

  getAngle(e) {
    const rect = this.container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
  }

  onPointerDown(e) {
    this.isDragging = true;
    this.lastAngle = this.getAngle(e);
  }

  onPointerMove(e) {
    if (!this.isDragging) return;
    const currentAngle = this.getAngle(e);
    const delta = currentAngle - this.lastAngle;
    this.currentRotation += delta;
    this.lastAngle = currentAngle;

    const outerRing = this.container.querySelector('.ring-outer');
    if (outerRing) {
      outerRing.style.transform = `rotate(${this.currentRotation}deg)`;
    }

    // Gentle tick sound on noticeable turn
    if (Math.abs(delta) > 4 && window.magicalAudio) {
      window.magicalAudio.playChime(1000 + Math.abs(delta) * 20, 0.05);
    }
  }

  onPointerUp() {
    this.isDragging = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.astrolabeManager = new AstrolabeManager();
});
