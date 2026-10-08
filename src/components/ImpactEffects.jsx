import { SPARK_COUNT } from "../config";

/** Barrier at the end of the road + shockwave ring + sparks. Animated in animation/crash.js. */
export default function ImpactEffects() {
  return (
    <>
      <div data-barrier aria-hidden="true" className="barrier absolute left-1/2 z-[3] rounded" />

      <div
        data-ring
        aria-hidden="true"
        className="impact-point absolute z-[5] -mt-10 -ml-10 size-20 rounded-full border-2 border-accent opacity-0"
      />

      <div aria-hidden="true" className="impact-point absolute z-[5] size-0">
        {Array.from({ length: SPARK_COUNT }, (_, i) => (
          <i key={i} data-spark className="spark absolute left-0 top-0 h-3.5 w-[3px] rounded-sm bg-accent opacity-0" />
        ))}
      </div>
    </>
  );
}
