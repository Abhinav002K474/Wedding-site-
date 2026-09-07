/**
 * Scene 04: The Magical Journey — Marauder's Map Procedural Ink Path & Footsteps
 */
class JourneyMapManager {
  constructor() {
    this.section = document.getElementById('scene-04');
    this.map = document.getElementById('journey-map');
    this.drawnPath = document.getElementById('journey-revealed-track');
    this.footprintsLayer = document.getElementById('footprints-layer');
    this.waypoints = document.querySelectorAll('.waypoint-item');

    this.pathLength = 0;
    this.hasInitialized = false;

    this.init();
  }

  init() {
    if (!this.drawnPath || !this.map) return;

    this.pathLength = this.drawnPath.getTotalLength ? this.drawnPath.getTotalLength() : 1200;
    this.drawnPath.style.strokeDasharray = this.pathLength;
    this.drawnPath.style.strokeDashoffset = this.pathLength;

    // Generate footprint coordinates along the SVG curve
    this.generateFootprints();

    // Scroll listener for progressive path drawing
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    this.handleScroll();

    // Click on waypoints for sparkle interaction
    this.waypoints.forEach(wp => {
      wp.addEventListener('click', (e) => {
        wp.classList.add('waypoint-active');
        if (window.magicalAudio) {
          window.magicalAudio.playChime(640, 0.8);
        }
        if (window.skyParticles) {
          const rect = wp.getBoundingClientRect();
          window.skyParticles.spawnTouchBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
        }
      });
    });
  }

  generateFootprints() {
    if (!this.drawnPath.getPointAtLength || !this.footprintsLayer) return;

    const svg = this.drawnPath.ownerSVGElement;
    const vbWidth = svg && svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal.width : 360;
    const vbHeight = svg && svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal.height : 880;

    const stepInterval = 28;
    const totalSteps = Math.floor(this.pathLength / stepInterval);

    this.footprintsLayer.innerHTML = '';

    for (let i = 2; i < totalSteps - 1; i++) {
      const length = i * stepInterval;
      const pt1 = this.drawnPath.getPointAtLength(length);
      const pt2 = this.drawnPath.getPointAtLength(Math.min(length + 4, this.pathLength));

      const angle = Math.atan2(pt2.y - pt1.y, pt2.x - pt1.x) * (180 / Math.PI);
      const isLeftFoot = i % 2 === 0;
      const lateralOffset = isLeftFoot ? -6 : 6;

      const normX = Math.cos((angle + 90) * (Math.PI / 180)) * lateralOffset;
      const normY = Math.sin((angle + 90) * (Math.PI / 180)) * lateralOffset;

      const fp = document.createElement('div');
      fp.className = 'footprint';
      fp.style.left = `${((pt1.x + normX) / vbWidth) * 100}%`;
      fp.style.top = `${((pt1.y + normY) / vbHeight) * 100}%`;
      fp.style.transform = `translate(-50%, -50%) rotate(${angle + 90}deg)`;
      fp.dataset.lengthFraction = (length / this.pathLength).toFixed(3);

      this.footprintsLayer.appendChild(fp);
    }
  }

  handleScroll() {
    if (!this.section) return;

    const rect = this.section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Progress through scene: 0 when top enters viewport, 1 when section bottom leaves
    const totalDist = rect.height + windowHeight;
    const currentDist = windowHeight - rect.top;
    let progress = currentDist / totalDist;
    progress = Math.max(0, Math.min(1, progress * 1.35)); // Natural cinematic progress

    // Update drawn SVG track
    const drawOffset = this.pathLength * (1 - progress);
    this.drawnPath.style.strokeDashoffset = drawOffset;

    // Reveal footprints that fall within current progress
    const fps = this.footprintsLayer.querySelectorAll('.footprint');
    fps.forEach(fp => {
      const frac = parseFloat(fp.dataset.lengthFraction);
      if (progress >= frac) {
        fp.classList.add('visible');
      } else {
        fp.classList.remove('visible');
      }
    });

    // Reveal waypoints based on progress
    this.waypoints.forEach((wp, idx) => {
      const triggerFrac = 0.15 + (idx * 0.23);
      if (progress >= triggerFrac) {
        wp.classList.add('waypoint-active');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.journeyMapManager = new JourneyMapManager();
});
