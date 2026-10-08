/** The page that opens from the crash point. Clipped to nothing until the timeline reveals it. */
export default function Finale() {
  return (
    <div
      data-finale
      className="finale pointer-events-none absolute inset-0 z-10 grid place-items-center bg-accent px-[6vw] text-center text-[#0b0e08]"
    >
      <div>
        <h2 data-finale-item className="mb-[.5em] font-display text-[clamp(1.8rem,5.6vw,4.6rem)] font-light leading-[1.1]">
          Smooth to the last mile.
        </h2>
        <p data-finale-item className="mx-auto mb-8 max-w-[40ch] text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.55] text-[#0b0e08]/70">
          Better results happen when the ride is frictionless.
        </p>
        <button
          data-finale-item
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer rounded-full bg-[#0b0e08] px-7 py-4 font-body font-medium text-accent
                     focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#0b0e08]"
        >
          Drive again
        </button>
      </div>
    </div>
  );
}
