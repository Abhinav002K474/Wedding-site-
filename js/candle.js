/**
 * Scene 01: The Arrival — Physical Candle Simulation & Light Bloom
 */
class CandleSceneManager {
  constructor() {
    this.canvas = document.getElementById('flame-canvas');
    this.halo = document.getElementById('candle-halo');
    this.vessel = document.getElementById('candle-vessel');
    this.hint = document.getElementById('candle-hint');
    this.isIgnited = false;

    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.flameIntensity = 1.0;
    this.flickerSpeed = 0.08;
    this.flickerPhase = 0;
    this.isTouched = false;

    this.init();
  }

  init() {
    // 1. Staggered prologue text reveals
    this.revealPrologue();

    // 2. Start organic flame animation loop
    this.animateFlame();

    // 3. Bind interactions (Touch / Tap / Click)
    if (this.vessel) {
      this.vessel.addEventListener('pointerdown', (e) => this.handleCandleTouch(e));
      this.vessel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleCandleTouch(e);
        }
      });
    }
  }

  revealPrologue() {
    const l1 = document.querySelector('.prologue-line.line-1');
    const l2 = document.querySelector('.prologue-line.line-2');
    const l3 = document.querySelector('.prologue-line.line-3');

    setTimeout(() => l1 && l1.classList.add('visible'), 600);
    setTimeout(() => l2 && l2.classList.add('visible'), 2200);
    setTimeout(() => l3 && l3.classList.add('visible'), 3800);
  }

  animateFlame() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.flickerPhase += this.flickerSpeed;
    const flicker = Math.sin(this.flickerPhase) * 2.5 + Math.cos(this.flickerPhase * 2.3) * 1.5;
    const sway = Math.sin(this.flickerPhase * 0.7) * 2;

    const baseX = this.width / 2;
    const baseY = this.height - 25;
    const flameHeight = (55 + flicker * 2) * this.flameIntensity;
    const flameWidth = (22 + flicker * 0.8) * this.flameIntensity;

    // Outer Glow Aura
    const outerGrad = this.ctx.createRadialGradient(
      baseX, baseY - flameHeight * 0.5, 5,
      baseX, baseY - flameHeight * 0.5, flameWidth * 2.2
    );
    outerGrad.addColorStop(0, 'rgba(252, 163, 61, 0.45)');
    outerGrad.addColorStop(0.5, 'rgba(226, 190, 108, 0.2)');
    outerGrad.addColorStop(1, 'rgba(252, 163, 61, 0)');

    this.ctx.fillStyle = outerGrad;
    this.ctx.beginPath();
    this.ctx.arc(baseX, baseY - flameHeight * 0.5, flameWidth * 2.2, 0, Math.PI * 2);
    this.ctx.fill();

    // Outer Orange Flame Teardrop
    this.ctx.beginPath();
    this.ctx.moveTo(baseX - flameWidth * 0.5, baseY);
    this.ctx.bezierCurveTo(
      baseX - flameWidth * 0.7, baseY - flameHeight * 0.4,
      baseX + sway - flameWidth * 0.2, baseY - flameHeight * 0.8,
      baseX + sway, baseY - flameHeight
    );
    this.ctx.bezierCurveTo(
      baseX + sway + flameWidth * 0.2, baseY - flameHeight * 0.8,
      baseX + flameWidth * 0.7, baseY - flameHeight * 0.4,
      baseX + flameWidth * 0.5, baseY
    );
    this.ctx.closePath();

    const flameGrad = this.ctx.createLinearGradient(baseX, baseY, baseX, baseY - flameHeight);
    flameGrad.addColorStop(0, '#c93b0e');
    flameGrad.addColorStop(0.3, '#fca33d');
    flameGrad.addColorStop(0.8, '#ffde59');
    flameGrad.addColorStop(1, '#ffffff');
    this.ctx.fillStyle = flameGrad;
    this.ctx.fill();

    // Inner White-Hot Flame Core
    const innerWidth = flameWidth * 0.45;
    const innerHeight = flameHeight * 0.55;
    this.ctx.beginPath();
    this.ctx.moveTo(baseX - innerWidth * 0.5, baseY);
    this.ctx.bezierCurveTo(
      baseX - innerWidth * 0.6, baseY - innerHeight * 0.4,
      baseX + sway * 0.5, baseY - innerHeight * 0.8,
      baseX + sway * 0.5, baseY - innerHeight
    );
    this.ctx.bezierCurveTo(
      baseX + sway * 0.5, baseY - innerHeight * 0.8,
      baseX + innerWidth * 0.6, baseY - innerHeight * 0.4,
      baseX + innerWidth * 0.5, baseY
    );
    this.ctx.closePath();
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    this.ctx.fill();

    // Candle Wick
    this.ctx.fillStyle = '#111';
    this.ctx.fillRect(baseX - 1.5, baseY, 3, 10);

    // Periodically spawn floating embers when ignited
    if (this.isIgnited && Math.random() < 0.2 && window.skyParticles) {
      const rect = this.canvas.getBoundingClientRect();
      window.skyParticles.spawnCandleEmbers(rect.left + baseX, rect.top + baseY - flameHeight, 1);
    }

    requestAnimationFrame(() => this.animateFlame());
  }

  handleCandleTouch(e) {
    if (this.isIgnited) return;
    this.isIgnited = true;

    // Flare animation
    this.flameIntensity = 1.8;
    setTimeout(() => { this.flameIntensity = 1.2; }, 400);

    // Trigger audio
    if (window.magicalAudio) {
      window.magicalAudio.playFlameBloom();
      window.magicalAudio.playChime(660, 1.5);
    }

    // Touch burst particles
    if (window.skyParticles && e && e.clientX) {
      window.skyParticles.spawnTouchBurst(e.clientX, e.clientY, 20, true);
    }

    // Light up environment & body
    document.body.classList.add('candle-ignited');

    // Fade out hint
    if (this.hint) {
      this.hint.style.opacity = '0';
      this.hint.style.pointerEvents = 'none';
    }

    // Smooth scroll down to reveal Scene 02: The Invitation after light blooms
    setTimeout(() => {
      const scene2 = document.getElementById('scene-02');
      if (scene2) {
        scene2.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1100);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.candleManager = new CandleSceneManager();
});
