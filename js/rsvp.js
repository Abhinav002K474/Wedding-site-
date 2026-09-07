/**
 * Scene 08: The Enchanted RSVP — Animated Living Calligraphy & Wax Stamping
 */
class RSVPManager {
  constructor() {
    this.attendCard = document.getElementById('choice-attend');
    this.declineCard = document.getElementById('choice-decline');
    this.inkPreview = document.getElementById('ink-preview');
    this.inkText = document.getElementById('ink-written-text');
    this.progressiveFields = document.getElementById('progressive-fields');
    this.sealBtn = document.getElementById('seal-reply-btn');
    this.successOverlay = document.getElementById('rsvp-success');
    this.resetBtn = document.getElementById('reset-rsvp-btn');
    this.form = document.getElementById('rsvp-form');
    this.nameInput = document.getElementById('guest-name');

    this.selectedChoice = null;
    this.typewriterTimer = null;

    this.init();
  }

  init() {
    if (!this.attendCard || !this.declineCard) return;

    // Choice card listeners
    this.attendCard.addEventListener('click', () => this.selectChoice('attend', '“I shall be there to celebrate under the stars.”'));
    this.declineCard.addEventListener('click', () => this.selectChoice('decline', '“With love, my heart attends from afar.”'));

    // Seal button click
    if (this.sealBtn) {
      this.sealBtn.addEventListener('click', () => this.submitReply());
    }

    // Reset button click
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.resetForm());
    }
  }

  selectChoice(choice, message) {
    this.selectedChoice = choice;

    // Toggle active styles
    this.attendCard.classList.toggle('selected', choice === 'attend');
    this.declineCard.classList.toggle('selected', choice === 'decline');

    // Show calligraphic ink preview
    if (this.inkPreview) {
      this.inkPreview.classList.add('active');
    }

    // Typewriter effect simulating magical calligraphy
    this.animateCalligraphy(message);

    // Progressive fields reveal
    if (this.progressiveFields) {
      this.progressiveFields.classList.add('is-expanded');
    }

    // Play subtle rustle & chime
    if (window.magicalAudio) {
      window.magicalAudio.playParchmentRustle();
      window.magicalAudio.playChime(700, 0.4);
    }
  }

  animateCalligraphy(text) {
    if (!this.inkText) return;
    clearTimeout(this.typewriterTimer);
    this.inkText.textContent = '';
    let i = 0;

    const typeChar = () => {
      if (i < text.length) {
        this.inkText.textContent += text.charAt(i);
        i++;
        this.typewriterTimer = setTimeout(typeChar, 28);
      }
    };
    typeChar();
  }

  submitReply() {
    // Validate guest name
    if (this.nameInput && !this.nameInput.value.trim()) {
      this.nameInput.focus();
      this.nameInput.style.borderColor = '#c93b0e';
      if (window.showToast) {
        window.showToast("Please inscribe your name upon the scroll.");
      }
      return;
    }

    // Play tactile wax stamp sound & chime
    if (window.magicalAudio) {
      window.magicalAudio.playWaxStamp();
    }

    // Spawn sparks
    if (window.skyParticles && this.sealBtn) {
      const rect = this.sealBtn.getBoundingClientRect();
      window.skyParticles.spawnTouchBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 30, true);
    }

    // Hide form, show sealed parchment success overlay
    if (this.form) this.form.style.display = 'none';
    if (this.successOverlay) {
      this.successOverlay.classList.add('active');
      this.successOverlay.setAttribute('aria-hidden', 'false');
    }

    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 150]);
    }
  }

  resetForm() {
    if (this.form) this.form.style.display = 'block';
    if (this.successOverlay) {
      this.successOverlay.classList.remove('active');
      this.successOverlay.setAttribute('aria-hidden', 'true');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.rsvpManager = new RSVPManager();
});
