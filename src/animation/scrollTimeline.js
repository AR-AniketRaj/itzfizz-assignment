import { gsap } from "../lib/gsap";
import { DRIVE } from "../config";
import { placeImpact } from "./geometry";

/** The scrubbed, pinned timeline everything else is added to. */
export function createScrollTimeline(els) {
  return gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: els.root,
      start: "top top",
      end: DRIVE.scrollLength,
      pin: true,
      scrub: DRIVE.scrub,
      anticipatePin: 1,
      invalidateOnRefresh: true, // re-measure function-based values on resize
      onRefreshInit: () => placeImpact(els),
      // the finale button should only be clickable once the page has opened
      onUpdate: (self) => {
        els.finale.style.pointerEvents = self.progress > 0.96 ? "auto" : "none";
      },
    },
  });
}
