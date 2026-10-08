import { DRIVE } from "../config";
import { driveDistance } from "./geometry";

/** t = 0 → 1: the car drives down the road. */
export function addDrive(tl, els) {
  tl.to(els.rig, { y: driveDistance, duration: 1 }, 0) // car travels
    .to(els.lanes, { y: -DRIVE.laneTravel, duration: 1 }, 0) // lane dashes rush past
    .fromTo(els.trail, { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0) // neon trail follows
    .to(els.headline, { y: -50, opacity: 0.12, duration: 0.45 }, 0.05) // headline drifts away
    .to(els.hint, { opacity: 0, duration: 0.05 }, 0);
}
