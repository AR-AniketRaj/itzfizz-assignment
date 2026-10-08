/**
 * One statistic beside the road. Starts hidden – the timeline pops it up
 * when the car steers toward its side (see animation/stats.js).
 */
export default function StatCard({ value, label, side, at }) {
  const isLeft = side === "left";

  return (
    <article
      data-stat
      data-at={at}
      data-side={side}
      data-value={value}
      style={{ "--at": at }}
      className={`stat absolute z-[3] w-[calc(50%_-_var(--road-w)/2_-_20px)] max-w-80
        ${
          isLeft
            ? "right-[calc(50%_+_var(--road-w)/2_+_14px)] text-right"
            : "left-[calc(50%_+_var(--road-w)/2_+_14px)] text-left"
        }`}
    >
      <div className="relative px-[clamp(14px,3vw,44px)]">
        <div
          data-num
          className="font-display text-[clamp(1.3rem,3.2vw,2.7rem)] font-semibold leading-none
                     tracking-tight text-ink/90 tabular-nums"
        >
          <span data-count>0</span>
          <small className="ml-[.06em] text-[.55em] font-light text-accent">%</small>
        </div>

        <p
          data-label
          className={`mt-[.6em] max-w-[22ch] text-[clamp(.68rem,1vw,.88rem)] leading-[1.4] text-ink-soft
                      ${isLeft ? "ml-auto" : ""}`}
        >
          {label}
        </p>

        {/* connector from the number to the road */}
        <span
          data-line
          className={`absolute top-[.9em] h-0.5 w-[clamp(14px,3vw,44px)] bg-accent
                      ${isLeft ? "right-0 origin-right" : "left-0 origin-left"}`}
        />
        <span
          data-dot
          className={`absolute top-[calc(.9em_-_4px)] size-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]
                      ${isLeft ? "-right-[5px]" : "-left-[5px]"}`}
        />
      </div>
    </article>
  );
}
