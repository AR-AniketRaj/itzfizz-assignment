import { DRIVE } from "../config";

/** Distance (px) the car travels from its start to its stopping point. */
export const driveDistance = () => ((DRIVE.endVh - DRIVE.startVh) / 100) * innerHeight;

export const roadWidth = (els) => els.road.offsetWidth;

/** y (px) of the point where the car's nose touches the barrier. */
export const impactY = (els) => (DRIVE.endVh / 100) * innerHeight + els.rig.offsetHeight / 2;

/** Publish the impact point as a CSS variable so barrier, ring, sparks and flash line up. */
export const placeImpact = (els) => els.root.style.setProperty("--bt", `${impactY(els)}px`);
