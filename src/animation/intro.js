import { gsap } from "../lib/gsap";

const STATS_START = 1.1; // seconds after load when the first stat appears
const STATS_DELAY = 0.22; // delay between one stat and the next

/**
 * Page-load animation:
 *  road + barrier fade in → headline letters rise → car pops in →
 *  statistics appear one by one (and count up) with a short delay between them.
 */
export function playIntro(els) {
  const tl = gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .from(els.road, { opacity: 0, duration: 1.2 }, 0)
    .from(els.barrier, { opacity: 0, duration: 1 }, 0.8)
    .from(els.chars, { yPercent: 115, opacity: 0, duration: 1.1, stagger: 0.045 }, 0.15)
    .from(els.car, { opacity: 0, scale: 0.8, duration: 1, ease: "back.out(1.6)" }, 0.5);

  els.stats.forEach((stat, i) => {
    const at = STATS_START + i * STATS_DELAY;
    const count = stat.querySelector("[data-count]");
    const counter = { value: 0 };

    tl.from(stat, { opacity: 0, y: 36, duration: 0.9 }, at).to(
      counter,
      {
        value: Number(stat.dataset.value),
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => (count.textContent = Math.round(counter.value)),
      },
      at
    );
  });

  return tl;
}
