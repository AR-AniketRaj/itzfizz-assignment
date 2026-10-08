import { gsap, clamp01 } from "../lib/gsap";
import { DRIVE } from "../config";
import { driveDistance, roadWidth } from "./geometry";

/**
 * Waypoints the car steers through: it swings toward the side of each stat
 * (-1 = left of the road, +1 = right) and straightens out before the crash.
 */
function buildRoute(stats) {
  const waypoints = stats.map((s) => [parseFloat(s.dataset.at), s.dataset.side === "left" ? -1 : 1]);
  return [[0, 0], ...waypoints, [1, 0]];
}

/** Cosine interpolation between waypoints → { v: position (-1…1), d: slope per unit progress }. */
function sample(route, p) {
  for (let i = 0; i < route.length - 1; i++) {
    const [a, va] = route[i];
    const [b, vb] = route[i + 1];
    if (p <= b || i === route.length - 2) {
      const u = clamp01((p - a) / (b - a));
      return {
        v: va + ((vb - va) * (1 - Math.cos(Math.PI * u))) / 2,
        d: (((vb - va) * Math.PI) / 2) * Math.sin(Math.PI * u) / (b - a),
      };
    }
  }
}

/**
 * Drives the car's lateral wobble, heading and crash spin from the timeline's time.
 * Also reports how fast the car is moving so lights and speedometer can react.
 * quickTo reuses a single tween per property, so this stays cheap on every frame.
 */
export function createCarController(els, motion) {
  const setX = gsap.quickTo(els.rig, "x", { duration: 0.55, ease: "power3.out" });
  const setRotation = gsap.quickTo(els.rig, "rotation", { duration: 0.55, ease: "power3.out" });
  const route = buildRoute(els.stats);

  let lastProgress = 0;
  let lastTime = performance.now();

  return {
    update(time) {
      const p = Math.min(time, 1); // drive progress (stops at 1 – the crash)
      const rw = roadWidth(els);

      // keep the swing inside the road edges
      const amp = Math.min(rw * 0.09, rw / 2 - els.rig.offsetWidth / 2 - 8);
      const envelope = clamp01(p / 0.06) * (1 - clamp01((p - 0.93) / 0.07));
      const { v, d } = sample(route, p);

      // crash spin-out
      const crash = 1 - Math.pow(1 - clamp01((time - 1) / 0.3), 3);

      // gentle tyre wobble layered on top of the steering
      const wobble = Math.sin(p * Math.PI * 2 * DRIVE.wobbleCycles) * envelope;

      setX(v * amp + wobble * 2 + crash * rw * 0.09);
      const heading = -Math.atan2(d * amp, driveDistance()) * (180 / Math.PI) * 0.6; // nose turns toward the stat
      setRotation(heading + wobble * 2.8 + crash * 34);

      // speed signal (km/h-ish) for the headlights + speedometer
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      motion.current.target = Math.min(320, (Math.abs(p - lastProgress) / dt) * 1000 * 380);
      lastProgress = p;
      lastTime = now;
    },
  };
}
