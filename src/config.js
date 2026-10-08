/**
 * Single source of truth for content and tuning values.
 * Change numbers here – the components and animations read from this file.
 */

export const HEADLINE_WORDS = ["WELCOME", "ITZFIZZ"];

/** `at` = how far along the drive (0–1) the car draws level with the stat. */
export const STATS = [
  { id: "pickup-a", value: 58, label: "Increase in pick up point use", side: "left", at: 0.12 },
  { id: "calls-a", value: 23, label: "Decrease in customer phone calls", side: "right", at: 0.38 },
  { id: "pickup-b", value: 27, label: "Increase in pick up point use", side: "left", at: 0.64 },
  { id: "calls-b", value: 40, label: "Decrease in customer phone calls", side: "right", at: 0.9 },
];

export const DRIVE = {
  startVh: 30, // where the car starts (vh from the top)
  endVh: 78, // where the car stops (its centre, at the crash barrier)
  scrollLength: "+=480%", // how long the hero stays pinned
  scrub: 1.5, // seconds of smoothing behind the scrollbar
  laneTravel: 640, // px the lane dashes travel during the drive
  wobbleCycles: 9, // small tyre-wobble cycles over the whole drive
};

/**
 * Timeline units (the scrubbed timeline is 2 units long):
 *   0 → 1        the drive
 *   1 → 1.12     the crash
 *   1.12 → 1.85  the page opens from the impact point
 */
export const TIMELINE = {
  crashAt: 1,
  openAt: 1.12,
  openDuration: 0.73,
  finaleTextAt: 1.5,
  total: 2,
};

export const SPARK_COUNT = 16;

export const HEADLIGHT = {
  fadeInSeconds: 0.35, // light comes on quickly when the car rolls
  fadeOutSeconds: 0.7, // and dies away slowly when it stops
  onSpeed: 8, // speed above which the car counts as "moving"
  offSpeed: 3, // speed below which it counts as "stopped" (hysteresis)
  lampRestingOpacity: 0.18,
};
