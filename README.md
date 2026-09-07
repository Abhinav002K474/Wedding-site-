# ✧ Aurelius & Elena — Written in the Stars ✧

> *An enchanted, interactive digital wedding invitation inspired by the wizarding world and celestial magic.*

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Experience-ffd700?style=for-the-badge&logo=sparkles)](https://abhinav002k474.github.io/Wedding-site-/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Bespoke%20Animations-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

---

## ✦ Table of Contents

- [Overview](#-overview)
- [Key Experiences & Scenes](#-key-experiences--scenes)
- [Features & Interactive Mechanics](#-features--interactive-mechanics)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Deployment (GitHub Pages)](#-deployment-github-pages)
- [Audio & Accessibility](#-audio--accessibility)
- [Credits & Inspiration](#-credits--inspiration)

---

## ✦ Overview

**Aurelius Vance & Elena Blackwood** invite you on an interactive journey celebrating a love story written in ancient vows and eternal starlight.

Crafted with bespoke Vanilla JavaScript and CSS animations, this digital wedding experience abandons static invitations in favor of a 9-act continuous narrative journey: touchable candle flames, 3D wax seals, interactive liquid image transitions, celestial astrolabe countdowns, and procedural soundscapes.

---

## ✦ Key Experiences & Scenes

| Scene | Name | Description |
|---|---|---|
| **01** | **The Arrival** | Dark candle chamber with an interactive flame drawn on HTML5 Canvas. Lighting the candle awakens the celestial soundtrack and starfield. |
| **02** | **The Invitation** | Realistic 3D parchment envelope sealed with a crackable wax monogram (`A&E`). Touch to break the seal and unfold the invitation letter. |
| **03** | **The Two Stories** | Fluid comparison curtain revealing the bride and groom's parallel worlds through an interactive split-mask slider. |
| **04** | **The Journey Map** | Marauder-inspired interactive celestial trail charting the couple's milestones across time and geography. |
| **05** | **Pensieve Memories** | Liquid gallery featuring floating memory fragments with real-time SVG turbulence displacement map ripples. |
| **06** | **Sanctuary & Venue** | The Cloisters of Blackwood Manor, High Glade, Scotland — venue details, schedule of rites, and travel guidance. |
| **07** | **The Astrolabe Clock** | Steampunk celestial clock with nested rotating brass rings counting down to the hour of celebration. |
| **08** | **Enchanted RSVP** | Owl messenger parchment form with enchanted quill ink animations and interactive response validation. |
| **09** | **Save the Date** | Final Patronus-inspired starry constellation reveal with one-click `.ics` / Google Calendar export. |

---

## ✦ Features & Interactive Mechanics

- **Web Audio API Ambient Engine**: Procedurally synthesized musical tones, chimes, paper rustles, wax cracking, and flame ignitions without heavy external audio files.
- **Canvas Physics & Starfield**: Multi-layer dynamic night sky featuring twinkling stars, drifting stardust nebulae, and floating candle embers.
- **SVG Displacement Distortion**: Custom SVG `<feTurbulence>` and `<feDisplacementMap>` filters for organic liquid glass distortion on photo hovers.
- **Constellation Navigation HUD**: Floating HUD allowing seamless teleportation between story chapters with a real-time progress pulse.
- **Mobile First & Responsive**: Optimized for touch gestures, swipe controls, viewport bounds, and Retina displays.

---

## ✦ Project Architecture

```
Wedding-site-/
├── index.html                  # Core single-page narrative application
├── style.css                   # Comprehensive bespoke styling & design system
├── README.md                   # Project documentation
├── assets/
│   └── images/                 # Optimized wedding photography & portraits
│       ├── bride.jpg
│       ├── groom.jpg
│       └── memory_1..4.jpg
└── js/
    ├── app.js                  # Master initialization & scene orchestrator
    ├── astrolabe.js            # Celestial clock countdown calculation & rotation
    ├── audio.js                # Web Audio API sound synthesis & spatial audio
    ├── candle.js               # Canvas candle flame physics & ignition sequence
    ├── coupleSlider.js         # Interactive comparison slider
    ├── envelope.js             # 3D unsealing & wax break animation logic
    ├── finalReveal.js          # Constellation resolution & calendar export
    ├── journeyMap.js           # Celestial milestones map
    ├── liquidGallery.js        # SVG liquid displacement gallery
    ├── particles.js            # Night sky stardust & ambient particle system
    ├── rsvp.js                 # Enchanted RSVP parchment form handling
    └── venue.js                # Sanctuary venue & ceremony guide
```

---

## ✦ Getting Started

### Local Development

This project has **zero external build dependencies or package installations**. Any modern browser and static server will run it seamlessly.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Abhinav002K474/Wedding-site-.git
   cd Wedding-site-
   ```

2. **Run a local web server**:
   - Using Python:
     ```bash
     python -m http.server 8000
     ```
   - Using Node (npx):
     ```bash
     npx serve .
     ```
   - Or open `index.html` directly in any modern browser (Chrome, Safari, Firefox, Edge).

3. Visit `http://localhost:8000` in your web browser.

---

## ✦ Deployment (GitHub Pages)

To publish this website live for guests via **GitHub Pages**:

1. Go to your repository on GitHub: `https://github.com/Abhinav002K474/Wedding-site-`
2. Click on **Settings** → **Pages** (under the "Code and automation" section).
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Select `main` branch and `/ (root)` folder.
5. Click **Save**.
6. Within a minute or two, your live enchanted wedding invitation will be published at:
   `https://abhinav002k474.github.io/Wedding-site-/`

---

## ✦ Audio & Accessibility

- **Browser Audio Policies**: Audio playback complies with browser autoplay restrictions; sound is gently initialized on the guest's first interaction with the candle flame or the HUD sound toggle.
- **Reduced Motion Support**: Respects `prefers-reduced-motion` media queries for accessibility.
- **Semantic HTML**: Fully accessible semantic tags, keyboard focus rings, and screen-reader ARIA landmarks.

---

## ✦ License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <i>"Some stories are written... others are enchanted."</i><br>
  ✦ ✦ ✦
</p>
