import { useEffect } from "react";
import { gsap } from "../lib/gsap";
import { HEADLIGHT } from "../config";

/**
 * Headlights + speedometer, updated on GSAP's ticker.
 *
 *  - Headlights ease ON when the car starts rolling and ease OFF when it stops.
 *    Separate on/off speeds (hysteresis) stop them flickering around the threshold.
 *  - The speed readout writes straight to the DOM so React never re-renders per frame.
 */
export function useCarInstruments(scope, motion, enabled) {
  useEffect(() => {
    if (!enabled) return;

    const root = scope.current;
    const beam = root.querySelector("[data-beam]");
    const lamps = root.querySelector("[data-lamps]");
    const speedEl = root.querySelector("[data-speed]");

    const setBeam = gsap.quickSetter(beam, "opacity");
    const setLamps = gsap.quickSetter(lamps, "opacity");

    let speed = 0; // smoothed speed shown on the HUD
    let light = 0; // 0 (off) → 1 (full beam)
    let moving = false;
    let lastText = "0";

    const tick = (_time, deltaMs) => {
      // speed decays when no new scroll updates arrive, then eases toward the target
      motion.current.target *= 0.9;
      speed += (motion.current.target - speed) * 0.12;

      const text = String(Math.round(speed));
      if (text !== lastText) {
        speedEl.textContent = text;
        lastText = text;
      }

      if (!moving && speed > HEADLIGHT.onSpeed) moving = true;
      else if (moving && speed < HEADLIGHT.offSpeed) moving = false;

      // frame-rate independent exponential easing
      const seconds = moving ? HEADLIGHT.fadeInSeconds : HEADLIGHT.fadeOutSeconds;
      light += ((moving ? 1 : 0) - light) * (1 - Math.exp(-(deltaMs / 1000) / seconds));
      if (light < 0.001) light = 0;

      setBeam(light);
      setLamps(HEADLIGHT.lampRestingOpacity + (1 - HEADLIGHT.lampRestingOpacity) * light);
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [scope, motion, enabled]);
}
