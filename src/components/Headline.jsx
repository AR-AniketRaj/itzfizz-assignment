import { HEADLINE_WORDS } from "../config";

/** "W E L C O M E   I T Z F I Z Z" – each letter is its own span for the staggered reveal. */
export default function Headline() {
  const lastWord = HEADLINE_WORDS.length - 1;

  return (
    <h1
      data-headline
      aria-label={HEADLINE_WORDS.join(" ")}
      className="absolute inset-x-0 top-[clamp(28px,9vh,96px)] z-[5] m-0 flex flex-wrap justify-center
                 gap-x-[1.1em] gap-y-[.35em] px-[5vw] font-display text-[clamp(1rem,2.5vw,2.2rem)]
                 font-light leading-[1.1] text-ink will-change-transform"
    >
      {HEADLINE_WORDS.map((word, wordIndex) => (
        <span
          key={word}
          aria-hidden="true"
          // overflow-hidden masks the letters as they rise; negative margin cancels trailing tracking
          className="inline-block overflow-hidden whitespace-nowrap py-[.12em] tracking-[.55em] -mr-[.55em]"
        >
          {[...word].map((letter, i) => (
            <span
              key={i}
              data-char
              className={`inline-block will-change-transform ${wordIndex === lastWord ? "font-semibold" : ""}`}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
