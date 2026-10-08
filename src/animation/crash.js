import { gsap } from "../lib/gsap";
import { TIMELINE } from "../config";
import { driveDistance } from "./geometry";

const BUMP_PX = 14; // how far the nose pushes into the barrier

/** Sparks fan upward from the impact point; vector `i` of `count`. */
function sparkVector(i, count) {
  const angle = -Math.PI * (0.06 + 0.88 * (i / (count - 1)));
  const distance = 70 + ((i * 53) % 80);
  return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, angle };
}

/** t = 1 → 1.12: impact, rebound, squash, glow, shockwave, sparks and a soft screen shake. */
export function addCrash(tl, els) {
  const T = TIMELINE.crashAt;

  // car pushes into the barrier, then rebounds
  tl.fromTo(els.rig, { y: driveDistance }, { y: () => driveDistance() + BUMP_PX, duration: 0.03, ease: "power2.out", immediateRender: false }, T)
    .fromTo(els.rig, { y: () => driveDistance() + BUMP_PX }, { y: () => driveDistance() - innerHeight * 0.035, duration: 0.25, ease: "power3.out", immediateRender: false }, T + 0.03)
    // body squash and recovery
    .to(els.car, { scaleY: 0.88, duration: 0.03 }, T)
    .to(els.car, { scaleY: 1, duration: 0.12, ease: "elastic.out(1, 0.4)" }, T + 0.03)
    // barrier takes the hit
    .to(els.barrier, { y: 6, duration: 0.03 }, T)
    .to(els.barrier, { y: 0, duration: 0.1, ease: "power2.out" }, T + 0.03)
    // soft lime glow instead of a hard white flash
    .fromTo(els.flash, { opacity: 0 }, { opacity: 0.6, duration: 0.07, ease: "sine.out" }, T)
    .to(els.flash, { opacity: 0, duration: 0.32, ease: "sine.inOut" }, T + 0.07)
    // shockwave ring
    .fromTo(els.ring, { scale: 0.1 }, { scale: 7, duration: 0.3, ease: "power2.out" }, T)
    .fromTo(els.ring, { opacity: 0 }, { opacity: 0.5, duration: 0.05, ease: "sine.out" }, T)
    .to(els.ring, { opacity: 0, duration: 0.25, ease: "sine.inOut" }, T + 0.05);

  // gentle screen shake
  [[-5, 3], [4, -3], [-3, 2], [1, -1], [0, 0]].forEach(([x, y], i) => {
    tl.to(els.stage, { x, y, duration: 0.035, ease: "sine.inOut" }, T + i * 0.035);
  });

  // sparks
  els.sparks.forEach((spark, i) => {
    const { x, y, angle } = sparkVector(i, els.sparks.length);
    gsap.set(spark, { rotation: (angle * 180) / Math.PI + 90 });
    tl.fromTo(spark, { x: 0, y: 0, scale: 1 }, { x, y, scale: 0.3, duration: 0.22, ease: "power2.out" }, T)
      .fromTo(spark, { opacity: 0 }, { opacity: 0.85, duration: 0.05, ease: "sine.out" }, T)
      .to(spark, { opacity: 0, duration: 0.25, ease: "sine.inOut" }, T + 0.05);
  });
}
