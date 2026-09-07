/**
 * Scene 09: Final Reveal — Constellation Monogram, Save the Date & Calendar Export
 */
class FinalRevealManager {
  constructor() {
    this.addCalBtn = document.getElementById('add-calendar-btn');
    this.shareBtn = document.getElementById('share-invite-btn');
    this.scrollTopBtn = document.getElementById('scroll-top-btn');

    this.init();
  }

  init() {
    if (this.addCalBtn) {
      this.addCalBtn.addEventListener('click', () => this.generateCalendarFile());
    }

    if (this.shareBtn) {
      this.shareBtn.addEventListener('click', () => this.shareInvitation());
    }

    if (this.scrollTopBtn) {
      this.scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (window.magicalAudio) {
          window.magicalAudio.playChime(528, 1);
        }
      });
    }
  }

  generateCalendarFile() {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aurelius and Elena Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-aurelius-elena-2026@enchanted',
      'DTSTAMP:20260906T120000Z',
      'DTSTART:20261024T153000Z',
      'DTEND:20261025T000000Z',
      'SUMMARY:Wedding of Aurelius Vance & Elena Blackwood',
      'DESCRIPTION:A story written in the stars. The celebration of marriage under the celestial glass observatory.',
      'LOCATION:The Cloisters of Blackwood Manor, High Glade, Perthshire, Scotland',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Aurelius-Elena-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (window.showToast) {
      window.showToast("Celestial event added to your calendar.");
    }
    if (window.magicalAudio) {
      window.magicalAudio.playChime(900, 1.2);
    }
  }

  async shareInvitation() {
    const shareData = {
      title: 'Aurelius & Elena — Written in the Stars',
      text: 'You are cordially invited to celebrate our wedding under the stars.',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        if (window.showToast) {
          window.showToast("Magical scroll link copied to clipboard.");
        }
      } catch (e) {
        if (window.showToast) {
          window.showToast("Link: " + window.location.href);
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.finalRevealManager = new FinalRevealManager();
});
