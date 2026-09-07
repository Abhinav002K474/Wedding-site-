/**
 * Central Experience Coordinator
 * Manages narrative scene orchestration, constellation navigation tracking, audio HUD, and toast messaging.
 */
class AppCoordinator {
  constructor() {
    this.soundToggle = document.getElementById('sound-toggle');
    this.navNodes = document.querySelectorAll('.nav-node');
    this.scenes = document.querySelectorAll('.scene');
    this.toast = document.getElementById('toast-message');
    this.toastTimer = null;

    this.init();
  }

  init() {
    // 1. Remove loading state
    window.addEventListener('load', () => {
      document.body.classList.remove('is-loading');
    });

    // 2. Audio toggle interaction
    if (this.soundToggle) {
      this.soundToggle.addEventListener('click', () => {
        if (window.magicalAudio) {
          const isPlaying = window.magicalAudio.toggleSound();
          this.soundToggle.classList.toggle('is-playing', isPlaying);
          this.showToast(isPlaying ? "Atmospheric sound enchanted." : "Atmosphere silenced.");
        }
      });
    }

    // 3. Navigation nodes click-to-scroll
    this.navNodes.forEach((node) => {
      node.addEventListener('click', () => {
        const sceneIndex = parseInt(node.dataset.scene, 10);
        const targetScene = this.scenes[sceneIndex];
        if (targetScene) {
          targetScene.scrollIntoView({ behavior: 'smooth' });
          if (window.magicalAudio) {
            window.magicalAudio.playChime(600 + sceneIndex * 40, 0.4);
          }
        }
      });
    });

    // 4. IntersectionObserver for active scene tracking in constellation HUD
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.2
    };

    const sceneObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sceneId = entry.target.id;
          const sceneNum = parseInt(sceneId.replace('scene-0', '').replace('scene-', ''), 10) - 1;
          this.updateActiveNavNode(sceneNum);
        }
      });
    }, observerOptions);

    this.scenes.forEach((scene) => sceneObserver.observe(scene));

    // Global toast method exposed
    window.showToast = (msg) => this.showToast(msg);
  }

  updateActiveNavNode(index) {
    this.navNodes.forEach((node, i) => {
      node.classList.toggle('active', i === index);
    });
  }

  showToast(message) {
    if (!this.toast) return;
    clearTimeout(this.toastTimer);
    this.toast.textContent = message;
    this.toast.classList.add('show');

    this.toastTimer = setTimeout(() => {
      this.toast.classList.remove('show');
    }, 3200);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.appCoordinator = new AppCoordinator();
});
