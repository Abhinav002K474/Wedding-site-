/**
 * Sky & Particle Canvas Engine
 * Renders atmospheric background stardust, constellation lines, floating embers, and touch bursts.
 */
class SkyParticleEngine {
  constructor(canvasId = 'sky-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.embers = [];
    this.touchBursts = [];
    
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });
    
    // Create initial field of ambient stars and stardust
    const starCount = Math.min(Math.floor((this.width * this.height) / 8000), 120);
    for (let i = 0; i < starCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        baseAlpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        color: Math.random() > 0.4 ? '226, 190, 108' : '215, 227, 239' // gold or silver-blue
      });
    }

    // Touch and click interaction for stardust ripples
    window.addEventListener('pointerdown', (e) => {
      this.spawnTouchBurst(e.clientX, e.clientY);
    }, { passive: true });

    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  spawnTouchBurst(x, y, count = 12, isEmber = false) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      this.touchBursts.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2.5 + 1,
        alpha: 1,
        decay: Math.random() * 0.03 + 0.015,
        color: isEmber ? '252, 163, 61' : '226, 190, 108'
      });
    }
  }

  spawnCandleEmbers(x, y, count = 4) {
    for (let i = 0; i < count; i++) {
      this.embers.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 1.5 - 0.8,
        radius: Math.random() * 1.8 + 0.6,
        alpha: 0.9,
        decay: 0.01 + Math.random() * 0.015,
        color: '252, 163, 61'
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw and update Ambient Starfield
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (!this.isReducedMotion) {
        p.twinklePhase += p.twinkleSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.twinklePhase) * 0.25;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = this.width;
        if (p.x > this.width) p.x = 0;
        if (p.y < 0) p.y = this.height;
        if (p.y > this.height) p.y = 0;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.05, p.alpha)})`;
      this.ctx.shadowColor = `rgba(${p.color}, 0.6)`;
      this.ctx.shadowBlur = p.radius * 2;
      this.ctx.fill();
    }

    // Reset shadow blur
    this.ctx.shadowBlur = 0;

    // 2. Draw subtle Constellation lines between nearby stars
    const maxDistance = 90;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.12;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(154, 180, 208, ${alpha})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }
    }

    // 3. Draw and update Touch Bursts
    for (let i = this.touchBursts.length - 1; i >= 0; i--) {
      const b = this.touchBursts[i];
      b.x += b.vx;
      b.y += b.vy;
      b.alpha -= b.decay;
      b.vx *= 0.96;
      b.vy *= 0.96;

      if (b.alpha <= 0) {
        this.touchBursts.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${b.color}, ${b.alpha})`;
      this.ctx.fill();
    }

    // 4. Draw Rising Embers
    for (let i = this.embers.length - 1; i >= 0; i--) {
      const em = this.embers[i];
      em.x += em.vx;
      em.y += em.vy;
      em.alpha -= em.decay;

      if (em.alpha <= 0 || em.y < 0) {
        this.embers.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(em.x, em.y, em.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${em.color}, ${em.alpha})`;
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.skyParticles = new SkyParticleEngine();
