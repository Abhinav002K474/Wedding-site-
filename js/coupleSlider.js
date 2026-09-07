/**
 * Scene 03: The Couple (Two Stories) — Interactive Fluid Boundary Slider
 */
class CoupleSliderManager {
  constructor() {
    this.stage = document.getElementById('portrait-stage') || document.getElementById('couple-slider');
    this.handle = document.getElementById('slider-handle');
    this.groomPanel = document.getElementById('panel-groom');
    this.bridePanel = document.getElementById('panel-bride');
    this.storyGroom = document.getElementById('story-groom');
    this.storyBride = document.getElementById('story-bride');
    this.unityBadge = document.getElementById('unity-badge');
    this.feDisp = document.getElementById('fe-disp');

    this.isDragging = false;
    this.sliderPos = 50; // percentage
    this.lastCrossedCenter = false;

    this.init();
  }

  init() {
    if (!this.stage || !this.handle) return;

    // Pointer event listeners for touch and mouse
    this.handle.addEventListener('pointerdown', (e) => this.startDrag(e));
    window.addEventListener('pointermove', (e) => this.onDrag(e), { passive: false });
    window.addEventListener('pointerup', () => this.stopDrag());
    window.addEventListener('pointercancel', () => this.stopDrag());

    // Allow clicking anywhere inside the portrait comparison stage to jump
    this.stage.addEventListener('pointerdown', (e) => {
      if (e.target !== this.handle && !this.handle.contains(e.target)) {
        this.updatePositionFromEvent(e);
      }
    });

    this.updateSliderUI(50);
  }

  startDrag(e) {
    this.isDragging = true;
    this.handle.setPointerCapture(e.pointerId);
    if (this.feDisp) {
      this.feDisp.setAttribute('scale', '15'); // Activate subtle liquid distortion
    }
  }

  onDrag(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    this.updatePositionFromEvent(e);
  }

  stopDrag() {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (this.feDisp) {
      this.feDisp.setAttribute('scale', '0');
    }
  }

  updatePositionFromEvent(e) {
    if (!this.stage) return;
    const rect = this.stage.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(5, Math.min(95, percent)); // Keep within visible bounds

    this.updateSliderUI(percent);
  }

  updateSliderUI(percent) {
    this.sliderPos = percent;

    // Update clip paths on portrait layers
    if (this.groomPanel) {
      this.groomPanel.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
    }
    if (this.bridePanel) {
      this.bridePanel.style.clipPath = `polygon(${percent}% 0, 100% 0, 100% 100%, ${percent}% 100%)`;
    }

    // Move handle
    if (this.handle) {
      this.handle.style.left = `${percent}%`;
      this.handle.setAttribute('aria-valuenow', Math.round(percent));
    }

    // Highlight corresponding story card below based on drag
    if (this.storyGroom && this.storyBride) {
      if (percent > 55) {
        // Dragged right -> reveals Aurelius
        this.storyGroom.classList.add('card-active');
        this.storyBride.classList.remove('card-active');
      } else if (percent < 45) {
        // Dragged left -> reveals Elena
        this.storyBride.classList.add('card-active');
        this.storyGroom.classList.remove('card-active');
      } else {
        // Center harmony -> both active
        this.storyGroom.classList.add('card-active');
        this.storyBride.classList.add('card-active');
      }
    }

    // Audio / haptic check when passing center
    const isPastCenter = percent > 50;
    if (isPastCenter !== this.lastCrossedCenter) {
      this.lastCrossedCenter = isPastCenter;
      if (window.magicalAudio) {
        window.magicalAudio.playChime(isPastCenter ? 720 : 600, 0.4);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.coupleSliderManager = new CoupleSliderManager();
});
