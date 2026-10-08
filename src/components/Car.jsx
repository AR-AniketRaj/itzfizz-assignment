import CarSvg from "./CarSvg.jsx";

/** The rig is what GSAP moves: car body + neon underglow + headlight beam. */
export default function Car() {
  return (
    <div data-rig aria-hidden="true" className="car-rig absolute left-1/2 z-[4] will-change-transform">
      <div data-beam className="car-beam absolute -left-[70%] top-[86%] -z-10 h-[150%] w-[240%] origin-top" />
      <div className="car-shadow absolute inset-x-[8%] top-[8%] -bottom-[3%] -z-10 rounded-[40%]" />
      <CarSvg />
    </div>
  );
}
