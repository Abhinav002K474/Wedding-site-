# ✧ Engineering & Design Specification: Aurelius & Elena Wedding Experience ✧

## 1. Executive Summary & Creative Vision

The **Aurelius & Elena Wedding Invitation** is a high-craft, single-page narrative web application designed to transport guests into an enchanted, celestial wizarding world. Rather than behaving as a static digital card, the experience unfolds as a continuous 9-act interactive story driven by tactile user interactions, physics-based canvas simulations, 3D CSS transforms, dynamic SVG filters, and an entirely procedural Web Audio synthesis engine.

### Key Objectives
- **Zero External Library Dependencies**: Built with 100% Vanilla JavaScript (ES6+), HTML5, and bespoke CSS3. No frameworks, no external audio audio asset dependencies, and no heavy runtime dependencies.
- **Atmospheric Immersion**: Multi-layer procedural starfield, realistic candle flicker physics, interactive wax seal fracture, fluid mask transitions, and celestial gear mechanisms.
- **Tactile Soundscapes**: Real-time acoustic feedback synthesized through the browser's native `AudioContext` (Solfeggio frequencies, resonant chimes, paper rustles, wax cracking, and warm harmonic drones).
- **Responsive & Touch-First**: Native touch gesture support (`pointerdown`, `pointermove`, `pointerup`), viewport adaptations, retina rendering, and graceful degradation.

---

## 2. Aesthetic & Design System

The visual identity marries **Dark Academia**, **Celestial Astrometry**, and **Magical Heritage**:

### Color Palette
- **Deep Void / Midnight**: `#06080e`, `#0a0d18` (infinite celestial depth)
- **Aged Parchment**: `#f6ebd7`, `#e7d7b8`, `#1a1612` (tactile magical manuscripts)
- **Antique Celestial Gold**: `#d4af37`, `#f3e5ab`, `#8b7322` (starlight, astrolabe brass, and royal monogramming)
- **Burgundy Wax & Embers**: `#6b121c`, `#a8202d`, `#ff9d42` (sealing wax and flame hearts)

### Typography
- **Headings & Display**: `Cinzel Decorative` & `Cinzel` (ancient stone engravings, royal proclamations)
- **Narrative & Calligraphy**: `Cormorant Garamond` (editorial serif for letters, vows, and dates)
- **Functional Interface**: `Montserrat` (clean geometric sans-serif for UI indicators, timers, and forms)

---

## 3. Project Architecture & File Breakdown

```
c:\Users\akabi\Harry Porter\
├── index.html                  # Single-page continuous narrative container (9 Scenes)
├── style.css                   # Custom CSS design system, 3D transforms, fluid typography
├── README.md                   # Repository overview & quick start guide
├── DOCUMENTATION.md            # In-depth architectural & technical specification
├── assets/
│   └── images/                 # Imagery for portraits and memories
│       ├── bride.jpg           # Elena Blackwood portrait
│       ├── groom.jpg           # Aurelius Vance portrait
│       └── memory_1..4.jpg     # Pensieve memory fragments
└── js/
    ├── app.js                  # Global application coordinator & scene observer
    ├── audio.js                # Web Audio API procedural sound synthesizer
    ├── candle.js               # Scene 01: Canvas flame physics & ignition sequence
    ├── envelope.js             # Scene 02: 3D wax seal fracture & letter unfold
    ├── coupleSlider.js         # Scene 03: Split-mask liquid comparison slider
    ├── journeyMap.js           # Scene 04: Constellation trail & waypoints
    ├── liquidGallery.js        # Scene 05: Pensieve memory gallery & SVG ripples
    ├── venue.js                # Scene 06: Sanctuary schedule & location details
    ├── astrolabe.js            # Scene 07: Steampunk celestial clock & countdown
    ├── rsvp.js                 # Scene 08: Living calligraphy & wax stamp RSVP
    ├── finalReveal.js          # Scene 09: Constellation resolve & .ics export
    └── particles.js            # Ambient canvas starfield & stardust physics
```

---

## 4. Technical Deep Dive: Scene-by-Scene

### Scene 01: The Arrival (`candle.js`)
- **Flame Physics Engine**: Renders a dynamic teardrop candle flame on an HTML5 `<canvas>` using cubic Bezier curves (`bezierCurveTo`).
- **Organic Flicker**: The flame's apex and sway are modulated each frame using harmonic sinusoidal oscillations:
  $$\text{flicker} = 2.5 \sin(\theta) + 1.5 \cos(2.3\theta)$$
  $$\text{sway} = 2 \sin(0.7\theta)$$
- **Ignition Event**: Tapping or clicking the candle ignites the flame, triggers a radial bloom halo, emits gold sparks into the particle canvas, plays an ignition woosh (`playFlameBloom`), and initiates the background ambient drone.

### Scene 02: The Invitation (`envelope.js`)
- **3D Isometric Envelope**: Constructed from layered CSS elements utilizing `perspective: 1200px` and `transform-style: preserve-3d`.
- **Fracturing Wax Seal**: Clicking the wax seal triggers an organic SVG crack pattern overlay, spawns 25 bursting gold particles, plays a synthesized crack sound (`playWaxCrack`), and smoothly flips the top flap open (`rotateX(180deg)`).
- **Parchment Unfolding**: The nested letter emerges from the envelope pocket via CSS translateY transitions accompanied by a synthesized paper rustle.

### Scene 03: The Two Stories (`coupleSlider.js`)
- **Fluid Split-Mask Slider**: Two full-bleed portrait panels are layered directly atop one another. The upper panel's visible area is bound dynamically using CSS `clip-path: polygon(...)`.
- **Pointer Tracking**: Supports mouse drags, touch slides, and keyboard arrows (`ArrowLeft` / `ArrowRight`), updating the slider handle rune with sub-pixel precision.

### Scene 04: The Journey Map (`journeyMap.js`)
- **Celestial Constellation Trail**: Inspired by enchanted navigational maps. Interactive waypoints represent chapters of the couple's history.
- **Dynamic Waypoint Activation**: Selecting a waypoint draws an illuminated starlight trail connecting nodes, updating the narrative vignette and triggering harmonic audio feedback.

### Scene 05: Pensieve Memories (`liquidGallery.js`)
- **SVG Displacement Distortion**: Images are filtered through a live SVG `<feDisplacementMap>` fed by a fractal `<feTurbulence>` noise generator.
- **Dynamic Ripple Wave**: On cursor movement or touch drag, the turbulence base frequency and displacement scale are modulated in real-time to simulate looking into the Pensieve's magical liquid memory basin.

### Scene 06: Sanctuary & Venue (`venue.js`)
- **Cloisters of Blackwood Manor**: Displays ceremony hours, reception details, and attire guidelines (formal evening wear in celestial tones).
- **Travel & Lodging**: Integrated transport guide and coordinates for guests arriving in the Scottish Highlands.

### Scene 07: Astronomical Astrolabe Clock (`astrolabe.js`)
- **Live Target Countdown**: Calculates remaining days, hours, minutes, and seconds relative to `October 24, 2026, 16:30:00 GMT+1`.
- **Interactive Trigonometric Drag**: Guests can manually grab and spin the concentric astrolabe brass rings. The engine computes the polar angle using `Math.atan2(dy, dx)`:
  $$\theta = \text{atan2}(y_{\text{touch}} - y_{\text{center}}, x_{\text{touch}} - x_{\text{center}}) \times \frac{180}{\pi}$$
  Each rotation triggers procedural gear ticking audio.

### Scene 08: The Enchanted RSVP (`rsvp.js`)
- **Living Calligraphy**: When guests toggle their attendance, text appears via a typewriter letter-by-letter ink reveal with pen-stroke audio nuances.
- **Wax Stamping Submit**: Submitting the form plays a heavy wax stamp impact sound (`playWaxStamp`), closes the parchment, and displays a personal acceptance seal.

### Scene 09: Save the Date & Calendar Export (`finalReveal.js`)
- **Constellation Monogram**: Interactive starry lines connect to form the glowing **A & E** initials.
- **Native RFC 5545 iCalendar (`.ics`) Generator**: Generates an in-memory `.ics` calendar payload dynamically via a `Blob` URL:
  - Formatted with `DTSTART`, `DTEND`, `SUMMARY`, `DESCRIPTION`, and `LOCATION`.
  - Automatically triggers browser file download for Apple Calendar, Google Calendar, Outlook, and mobile devices without backend APIs.

---

## 5. Procedural Web Audio Synthesis (`audio.js`)

Unlike standard web audio implementations that rely on external `.mp3` files (which often fail due to CORS, bandwidth, or latency), this project builds every sound procedurally using the browser's native `AudioContext`:

1. **Warm Ambient Drone**:
   - Fundamental: $110\,\text{Hz}$ (A2 sine wave)
   - Harmonic Fifth: $164.8\,\text{Hz}$ (E3 triangle wave)
   - Celestial Octave: $329.6\,\text{Hz}$ (E4 sine wave)
   - Filtered through a 450 Hz low-pass biquad filter with exponential envelope swell.

2. **Wax Seal Fracture**:
   - Synthesized using a 150ms buffer of white noise passed through a band-pass filter ($1400\,\text{Hz}, Q=3$) coupled with a rapid downward exponential pitch chirp ($180\,\text{Hz} \to 60\,\text{Hz}$).

3. **Parchment Rustle**:
   - A modulated noise buffer shaped by sinusoidal windowing and an 800 Hz low-pass filter to replicate fiber friction.

4. **Celestial Chimes**:
   - Pure sine waves tuned to the Solfeggio 528 Hz transformation frequency, 660 Hz, and 784 Hz with long, gentle exponential decay.

---

## 6. Starfield & Particle Physics Engine (`particles.js`)

The background `<canvas id="sky-canvas">` runs an independent, high-performance animation loop:
- **Twinkling Star Layer**: 120 multi-magnitude stars rendered with individual pulsation cycles and spatial offsets.
- **Drifting Golden Nebulae**: Low-opacity drifting stardust clouds that gently follow cursor / touch coordinates.
- **Touch Burst Physics**: Interacting with candle flames, wax seals, or buttons spawns an explosion of directional sparks governed by velocity, gravity decay, and opacity fade.

---

## 7. Performance & Accessibility Standards

- **Frame Rate Optimization**: Animation loops utilize `requestAnimationFrame` and skip background processing when tab is inactive.
- **Layer Promotion**: Heavy visual layers use `will-change: transform` and CSS 3D transforms to force GPU compositing.
- **Autoplay Compliance**: Conforms strictly to modern browser autoplay policies (no audio plays until user triggers an intentional interaction).
- **Reduced Motion**: Honored via media queries to disable rapid rotations for motion-sensitive guests.
- **Semantic DOM**: Full ARIA roles (`role="slider"`, `role="button"`, `role="banner"`, `aria-label`) across all custom UI elements.

---

## 8. Customization Guide

To personalize this project for any other couple:
1. **Names & Text**: Update `index.html` lines 135–138 (Couple Title) and the narrative prologue.
2. **Date & Venue**: Adjust `targetDate` in [js/astrolabe.js](file:///c:/Users/akabi/Harry%20Porter/js/astrolabe.js) and the `.ics` calendar payload in [js/finalReveal.js](file:///c:/Users/akabi/Harry%20Porter/js/finalReveal.js).
3. **Photography**: Replace files inside [assets/images/](file:///c:/Users/akabi/Harry%20Porter/assets/images/) maintaining aspect ratios (`bride.jpg`, `groom.jpg`, `memory_1..4.jpg`).
4. **Monogram**: Modify the SVG monogram in Scene 02 and Scene 09 (`A&E`).

---

<p align="center">
  <i>Written in the Stars • Crafted with Pure Magic</i>
</p>
