import { domMax } from "motion/react";

// Loaded on demand by MotionProvider so the animation engine stays out of
// the initial bundle. domMax adds layout animations (filters, nav indicator).
export default domMax;
