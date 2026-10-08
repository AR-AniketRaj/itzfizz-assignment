/** Small on-screen extras: "scroll to drive" hint and a speedometer. */
export function ScrollHint() {
  return (
    <div
      data-hint
      aria-hidden="true"
      className="absolute bottom-[clamp(16px,4vh,36px)] left-[clamp(16px,4vw,48px)] z-[6] flex items-center gap-[.6em] text-sm text-ink-soft"
    >
      <i className="hint-line block h-[34px] w-px bg-ink-soft" />
      <span>Scroll to drive</span>
    </div>
  );
}

export function Speedometer() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-[clamp(16px,4vh,36px)] right-[clamp(16px,4vw,48px)] z-[6] text-right text-sm text-ink-soft tabular-nums"
    >
      <b data-speed className="mr-1 font-display text-[1.6rem] font-semibold text-ink">0</b>
      km/h
    </div>
  );
}
