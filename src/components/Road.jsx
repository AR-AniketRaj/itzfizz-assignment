/** Asphalt strip, lane dashes and the neon trail the car leaves behind. */
export default function Road() {
  return (
    <>
      <div
        data-road
        aria-hidden="true"
        className="road absolute inset-y-0 left-1/2 z-[1] box-border w-[var(--road-w)] -translate-x-1/2
                   overflow-hidden border-x-[3px] border-white/75"
      >
        <div data-lanes className="road-lanes absolute inset-x-0 top-0 will-change-transform" />
      </div>

      <div
        data-trail
        aria-hidden="true"
        className="trail absolute left-1/2 z-[2] -ml-[1.5px] w-[3px] origin-top rounded-sm will-change-transform"
      />
    </>
  );
}
