import { useGSAP, ScrollTrigger } from "../lib/gsap";
import { collectElements, prepareElements, showFinalState } from "../animation/elements";
import { placeImpact } from "../animation/geometry";
import { playIntro } from "../animation/intro";
import { createScrollTimeline } from "../animation/scrollTimeline";
import { addDrive } from "../animation/drive";
import { addStatReveals } from "../animation/stats";
import { addCrash } from "../animation/crash";
import { addFinale } from "../animation/finale";
import { createCarController } from "../animation/steering";

/**
 * Builds the whole hero experience:
 *   intro (on load)  +  one pinned, scrubbed timeline
 *   (drive → stats pop up → crash → page opens)
 *
 * `motion` is a shared ref the car controller writes its speed into.
 */
export function useHeroAnimation(scope, motion, reduced) {
  useGSAP(
    () => {
      const els = collectElements(scope.current);
      prepareElements(els);
      placeImpact(els);

      if (reduced) {
        showFinalState(els);
        return;
      }

      playIntro(els);

      const tl = createScrollTimeline(els);
      addDrive(tl, els);
      addStatReveals(tl, els);
      addCrash(tl, els);
      addFinale(tl, els);

      const car = createCarController(els, motion);
      tl.eventCallback("onUpdate", () => car.update(tl.time()));

      // web fonts change text metrics → re-measure the pin once they load
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope, dependencies: [reduced] }
  );
}
