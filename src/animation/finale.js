import { TIMELINE } from "../config";
import { impactY } from "./geometry";

/** A circle that grows out of the crash point. `radius` is px, or "max" to cover the viewport. */
const circleFromImpact = (els, radius) => () => {
  const r = radius === "max" ? Math.hypot(innerWidth, innerHeight) * 1.1 : radius;
  return `circle(${r}px at 50% ${impactY(els)}px)`;
};

/** t = 1.12 → 2: the page opens from the impact point and its content rises in. */
export function addFinale(tl, els) {
  tl.fromTo(
    els.finale,
    { clipPath: circleFromImpact(els, 0) },
    { clipPath: circleFromImpact(els, "max"), duration: TIMELINE.openDuration, ease: "power2.inOut" },
    TIMELINE.openAt
  )
    .to(els.stage, { scale: 0.94, duration: TIMELINE.openDuration, ease: "power1.in" }, TIMELINE.openAt)
    .fromTo(
      els.finaleItems,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.28, ease: "power3.out" },
      TIMELINE.finaleTextAt
    )
    .set({}, {}, TIMELINE.total); // pad the timeline to its full length
}
