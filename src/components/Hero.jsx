import { useRef } from "react";
import { DRIVE, STATS } from "../config";
import { prefersReducedMotion } from "../lib/gsap";
import { useHeroAnimation } from "../hooks/useHeroAnimation";
import { useCarInstruments } from "../hooks/useCarInstruments";
import Headline from "./Headline.jsx";
import Road from "./Road.jsx";
import StatCard from "./StatCard.jsx";
import Car from "./Car.jsx";
import ImpactEffects from "./ImpactEffects.jsx";
import { ScrollHint, Speedometer } from "./Hud.jsx";
import Finale from "./Finale.jsx";

const reducedMotion = prefersReducedMotion();

/**
 * Pinned hero: the car drives down the road (stats pop up as it steers toward them),
 * crashes into a barrier, and the finale page opens from the impact point.
 */
export default function Hero() {
  const heroRef = useRef(null);
  const motion = useRef({ target: 0 }); // speed signal: written by the timeline, read by the instruments

  useHeroAnimation(heroRef, motion, reducedMotion);
  useCarInstruments(heroRef, motion, !reducedMotion);

  return (
    <section
      ref={heroRef}
      aria-label="Itzfizz results"
      style={{ "--start": DRIVE.startVh, "--end": DRIVE.endVh }}
      className={`hero-bg relative h-svh overflow-hidden ${reducedMotion ? "reduce" : ""}`}
    >
      {/* everything that shakes on impact lives in the stage */}
      <div data-stage className="absolute inset-0 z-[1] will-change-transform">
        <Headline />
        <Road />
        {STATS.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
        <ImpactEffects />
        <Car />
        <ScrollHint />
        <Speedometer />
      </div>

      <div data-flash aria-hidden="true" className="flash pointer-events-none absolute inset-0 z-[8] opacity-0" />
      <Finale />
    </section>
  );
}
