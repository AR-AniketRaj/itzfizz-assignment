/** Top-down car, nose pointing down the page. Colours come from the Tailwind theme. */
export default function CarSvg() {
  return (
    <svg data-car viewBox="0 0 120 260" xmlns="http://www.w3.org/2000/svg" className="block h-full w-full overflow-visible origin-center">
      <defs>
        <clipPath id="car-body-clip">
          <path id="car-body" d="M60 8C88 8 100 20 102 50L106 110C108 150 104 200 96 228C90 246 76 252 60 252C44 252 30 246 24 228C16 200 12 150 14 110L18 50C20 20 32 8 60 8Z" />
        </clipPath>
        <linearGradient id="car-sheen" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".3" stopColor="#fff" stopOpacity=".22" />
          <stop offset=".6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".3" />
        </linearGradient>
      </defs>

      {/* wheels */}
      <g fill="#000" stroke="#2a2f2b" strokeWidth="1">
        <rect x="3" y="38" width="17" height="44" rx="5" />
        <rect x="100" y="38" width="17" height="44" rx="5" />
        <rect x="3" y="168" width="17" height="44" rx="5" />
        <rect x="100" y="168" width="17" height="44" rx="5" />
      </g>

      {/* mirrors */}
      <path className="fill-car-dark" d="M16 150 L4 154 L6 162 L18 160Z M104 150 L116 154 L114 162 L102 160Z" />

      {/* body, racing stripes and sheen */}
      <use href="#car-body" className="fill-car" />
      <g clipPath="url(#car-body-clip)">
        <rect x="52" y="0" width="5" height="260" className="fill-accent" />
        <rect x="63" y="0" width="5" height="260" className="fill-accent" />
        <rect x="0" y="0" width="120" height="260" fill="url(#car-sheen)" />
      </g>

      {/* glass + roof */}
      <path d="M36 176 L84 176 L90 138 L30 138Z" fill="#0a0d12" />
      <rect x="30" y="100" width="60" height="38" rx="8" className="fill-car-dark" />
      <path d="M34 100 L86 100 L82 80 L38 80Z" fill="#0a0d12" />

      {/* headlamps (opacity driven by useCarInstruments) and tail lights */}
      <path
        data-lamps
        className="car-lamps"
        style={{ opacity: 0.18 }}
        fill="#fff7d6"
        d="M28 232 Q36 240 46 238 L46 230 Q36 232 28 232Z M92 232 Q84 240 74 238 L74 230 Q84 232 92 232Z"
      />
      <rect x="30" y="12" width="22" height="4" rx="2" fill="#ff3b4a" />
      <rect x="68" y="12" width="22" height="4" rx="2" fill="#ff3b4a" />
    </svg>
  );
}
