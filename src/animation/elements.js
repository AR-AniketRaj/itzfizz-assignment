import { gsap } from "../lib/gsap";

/**
 * Collects every DOM node the animations need, using data-* hooks.
 * Components only expose hooks (data-rig, data-car …); all motion lives in /animation.
 */
export function collectElements(root) {
  const one = (selector) => root.querySelector(selector);
  const all = (selector) => [...root.querySelectorAll(selector)];

  return {
    root,
    stage: one("[data-stage]"),
    headline: one("[data-headline]"),
    chars: all("[data-char]"),
    road: one("[data-road]"),
    lanes: one("[data-lanes]"),
    trail: one("[data-trail]"),
    barrier: one("[data-barrier]"),
    stats: all("[data-stat]"),
    rig: one("[data-rig]"),
    car: one("[data-car]"),
    beam: one("[data-beam]"),
    lamps: one("[data-lamps]"),
    ring: one("[data-ring]"),
    sparks: all("[data-spark]"),
    flash: one("[data-flash]"),
    finale: one("[data-finale]"),
    finaleItems: all("[data-finale-item]"),
    hint: one("[data-hint]"),
    speed: one("[data-speed]"),
  };
}

/** Anchor transforms that GSAP owns from here on (centres elements on their CSS position). */
export function prepareElements(els) {
  gsap.set(els.rig, { xPercent: -50, yPercent: -50 });
  gsap.set(els.barrier, { xPercent: -50 });
  gsap.set(els.stats, { yPercent: -50 });
}

/** Static end-state used when the visitor prefers reduced motion. */
export function showFinalState(els) {
  els.stats.forEach((stat) => {
    stat.querySelector("[data-count]").textContent = stat.dataset.value;
    gsap.set(stat.querySelector("[data-line]"), { scaleX: 1 });
    gsap.set(stat.querySelector("[data-dot]"), { scale: 1 });
  });
  gsap.set(els.trail, { scaleY: 1 });
}
