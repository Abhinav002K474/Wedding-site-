/**
 * Scene 05: Memory Gallery — Fluid Liquid Gesture Distortion & Carousel
 */
class LiquidGalleryManager {
  constructor() {
    this.viewport = document.getElementById('liquid-gallery-viewport');
    this.track = document.getElementById('gallery-track');
    this.cards = document.querySelectorAll('.gallery-card');
    this.dots = document.querySelectorAll('.gallery-dot');
    this.prevBtn = document.getElementById('gallery-prev');
    this.nextBtn = document.getElementById('gallery-next');
    
    // Lightbox modal elements
    this.lightbox = document.getElementById('memory-lightbox');
    this.lightboxImg = document.getElementById('lightbox-image');
    this.lightboxTitle = document.getElementById('lightbox-title');
    this.lightboxText = document.getElementById('lightbox-text');
    this.lightboxClose = document.getElementById('lightbox-close');
    this.lightboxExit = document.querySelector('.lightbox-exit');
    this.feDisp = document.getElementById('fe-disp');

    this.currentIndex = 0;
    this.startX = 0;
    this.currentX = 0;
    this.isDragging = false;
    this.dragOffset = 0;

    this.init();
  }

  init() {
    if (!this.viewport || !this.track) return;

    // Pointer events for swipe manipulation
    this.viewport.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    window.addEventListener('pointermove', (e) => this.onPointerMove(e), { passive: false });
    window.addEventListener('pointerup', () => this.onPointerUp());
    window.addEventListener('pointercancel', () => this.onPointerUp());

    // Navigation buttons
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.navigate(-1));
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.navigate(1));

    // Dot indicators
    this.dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => this.goToIndex(idx));
    });

    // Lightbox triggers on card click
    this.cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        // If it was just a drag, don't open lightbox
        if (Math.abs(this.dragOffset) > 8) return;
        this.openLightbox(idx);
      });
    });

    if (this.lightboxClose) this.lightboxClose.addEventListener('click', () => this.closeLightbox());
    if (this.lightboxExit) this.lightboxExit.addEventListener('click', () => this.closeLightbox());

    this.updateGallery(false);
  }

  onPointerDown(e) {
    // Only capture if clicking inside the gallery track
    if (e.target.closest('.gallery-controls')) return;
    this.isDragging = true;
    this.startX = e.clientX;
    this.currentX = e.clientX;
    this.dragOffset = 0;
    this.track.style.transition = 'none';

    if (this.feDisp) {
      this.feDisp.setAttribute('scale', '10');
    }
  }

  onPointerMove(e) {
    if (!this.isDragging) return;
    this.currentX = e.clientX;
    this.dragOffset = this.currentX - this.startX;

    // Apply fluid drag resistance
    const viewportWidth = this.viewport.offsetWidth;
    const baseTranslate = -this.currentIndex * 100;
    const dragPercent = (this.dragOffset / viewportWidth) * 100;

    // Dynamic distortion scale based on gesture velocity & offset
    if (this.feDisp) {
      const distortion = Math.min(35, Math.abs(dragPercent) * 1.5);
      this.feDisp.setAttribute('scale', distortion.toFixed(1));
    }

    // Apply continuous transform & subtle 3D tilt
    const tilt = (this.dragOffset / viewportWidth) * 12;
    this.track.style.transform = `translateX(calc(${baseTranslate}% + ${this.dragOffset}px)) rotateY(${tilt}deg)`;
  }

  onPointerUp() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.track.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

    if (this.feDisp) {
      this.feDisp.setAttribute('scale', '0');
    }

    const threshold = this.viewport.offsetWidth * 0.18;
    if (this.dragOffset < -threshold && this.currentIndex < this.cards.length - 1) {
      this.navigate(1);
    } else if (this.dragOffset > threshold && this.currentIndex > 0) {
      this.navigate(-1);
    } else {
      this.updateGallery(true); // snap back
    }
  }

  navigate(dir) {
    const nextIdx = this.currentIndex + dir;
    if (nextIdx >= 0 && nextIdx < this.cards.length) {
      this.goToIndex(nextIdx);
    } else {
      this.updateGallery(true);
    }
  }

  goToIndex(index) {
    this.currentIndex = index;
    this.updateGallery(true);
    if (window.magicalAudio) {
      window.magicalAudio.playChime(500 + index * 80, 0.6);
    }
  }

  updateGallery(withAnimation = true) {
    if (withAnimation) {
      this.track.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
      this.track.style.transition = 'none';
    }

    const baseTranslate = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${baseTranslate}%) rotateY(0deg)`;

    // Update active class on cards & dots
    this.cards.forEach((c, idx) => {
      c.classList.toggle('active', idx === this.currentIndex);
    });
    this.dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === this.currentIndex);
    });
  }

  openLightbox(index) {
    const card = this.cards[index];
    if (!card || !this.lightbox) return;

    const img = card.querySelector('.gallery-img');
    const title = card.querySelector('.card-caption');
    const quote = card.querySelector('.card-quote');

    if (img && this.lightboxImg) this.lightboxImg.src = img.src;
    if (title && this.lightboxTitle) this.lightboxTitle.textContent = title.textContent;
    if (quote && this.lightboxText) this.lightboxText.textContent = quote.textContent;

    this.lightbox.classList.add('is-open');
    this.lightbox.setAttribute('aria-hidden', 'false');

    if (window.magicalAudio) {
      window.magicalAudio.playChime(880, 1.2);
    }
  }

  closeLightbox() {
    if (!this.lightbox) return;
    this.lightbox.classList.remove('is-open');
    this.lightbox.setAttribute('aria-hidden', 'true');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.liquidGalleryManager = new LiquidGalleryManager();
});
