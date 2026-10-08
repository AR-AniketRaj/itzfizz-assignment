# Itzfizz – Scroll-Driven Hero

A pinned hero where scrolling drives a car down a road. Stats pop up as the car steers toward
them, the headlights switch on when the car moves and off when it stops, and at the end the car
crashes into a barrier and the next page opens from the impact point.

**Stack:** React · GSAP (ScrollTrigger + `@gsap/react`) · Tailwind CSS v4 · Vite

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist
```

## Deploy to GitHub Pages

```bash
npm run deploy    # builds and publishes /dist to the gh-pages branch
```

Then in the repo: **Settings → Pages → Branch: `gh-pages` / root**.
(`vite.config.js` uses `base: "./"`, so no repo-name configuration is needed.)

## Structure

```
src/
├─ config.js                 ← content + every tuning value (stats, timings, headlight speeds…)
├─ App.jsx / main.jsx
├─ index.css                 ← Tailwind theme tokens + the few gradient/mask/keyframe styles
├─ components/               ← presentational only: markup + Tailwind classes + data-* hooks
│  ├─ Hero.jsx               ← composes everything
│  ├─ Headline.jsx  Road.jsx  StatCard.jsx  Car.jsx  CarSvg.jsx
│  ├─ ImpactEffects.jsx      ← barrier, shockwave ring, sparks
│  ├─ Hud.jsx                ← scroll hint + speedometer
│  └─ Finale.jsx             ← the page that opens after the crash
├─ hooks/
│  ├─ useHeroAnimation.js    ← builds intro + the pinned scroll timeline
│  └─ useCarInstruments.js   ← headlights + speedometer (GSAP ticker)
├─ animation/                ← all motion, one concern per file
│  ├─ elements.js            ← finds the data-* hooks, sets anchor transforms
│  ├─ geometry.js            ← drive distance, impact point
│  ├─ intro.js               ← page-load animation
│  ├─ scrollTimeline.js      ← pinned, scrubbed timeline
│  ├─ drive.js  stats.js  crash.js  finale.js   ← the four phases of the timeline
│  └─ steering.js            ← wobble / heading / crash spin + speed signal
└─ lib/gsap.js               ← plugin registration + small helpers
```

## How it works

The scrolled timeline is 2 units long and scrubbed to scroll progress (`scrub: 1.5` gives it inertia):

| Timeline | Phase |
|---|---|
| 0 → 1 | Car drives; lane dashes rush past; neon trail grows; each stat lights up (pops to full brightness) as the car steers toward it |
| 1 → 1.12 | Crash: bump + rebound, squash, soft glow, shockwave, sparks, small screen shake |
| 1.12 → 2 | A circular clip-path grows from the impact point and reveals the finale |

Performance notes: motion uses `transform` / `opacity` only; per-frame updates go through
`gsap.quickTo` / `quickSetter`, and the speedometer writes to the DOM directly so React doesn't
re-render while scrolling. Users with `prefers-reduced-motion` get a static layout.

## Design note

Per the brief, the statistics animate in **on page load, one by one with a short delay**
(and count up to their values). I then use them as scroll milestones: they start dimmed, and
as the car steers toward each one it pops to full brightness and a connector line is drawn.
This keeps the requirement intact while tying the stats into the scroll story that ends
with the crash. The load delay is set in `src/animation/intro.js` (`STATS_START`, `STATS_DELAY`).

## Tuning

Almost everything you'd want to change is in `src/config.js`: stat values/positions, scroll
length, wobble amount, and headlight fade times.
