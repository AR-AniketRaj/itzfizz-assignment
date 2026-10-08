/**
 * Stats are already on screen (dimmed) after the load animation.
 * As the car steers toward each one, it "lights up": the number pops to full
 * brightness with a soft overshoot, the caption brightens, and a connector
 * line + dot draw out toward the road.
 *
 * Note: the intro animates each stat's wrapper and its count-up; this file only
 * touches the inner elements, so the two animations never fight over a property.
 */
const DIMMED = 0.4;

export function addStatReveals(tl, els) {
  els.stats.forEach((stat) => {
    const at = parseFloat(stat.dataset.at);
    const start = Math.max(0, at - 0.06);
    const origin = stat.dataset.side === "left" ? "100% 50%" : "0% 50%";

    const num = stat.querySelector("[data-num]");
    const label = stat.querySelector("[data-label]");

    tl.fromTo(
      num,
      { opacity: DIMMED, scale: 0.86, transformOrigin: origin },
      { opacity: 1, scale: 1, duration: 0.16, ease: "back.out(1.6)" },
      start
    )
      .fromTo(
        label,
        { opacity: DIMMED },
        { opacity: 1, duration: 0.12, ease: "power2.out" },
        start + 0.04
      )
      .fromTo(
        stat.querySelector("[data-line]"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.06, ease: "power2.out" },
        start + 0.03
      )
      .fromTo(
        stat.querySelector("[data-dot]"),
        { scale: 0 },
        { scale: 1, duration: 0.06, ease: "back.out(3)" },
        start + 0.05
      );
  });
}
