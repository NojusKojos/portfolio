/**
 * Shared Framer Motion animation variants and transition presets.
 * All timings follow the Swiss design principle of deliberate, purposeful motion.
 */
import { Variants, Transition } from 'framer-motion';

/** Smooth exponential ease — fast out, very smooth */
export const easeOutExpo = [0.16, 1, 0.3, 1];
/** Snappy in-out for page transitions */
export const easeInOutExpo = [0.87, 0, 0.13, 1];
/** Spring-like overshoot for interactive elements */
export const easeSpring = [0.34, 1.56, 0.64, 1];

/** Standard transition preset */
export const transitionBase: Transition = {
  duration: 0.9,
  ease: easeOutExpo,
};

/** Fast snappy transition */
export const transitionFast: Transition = {
  duration: 0.4,
  ease: easeOutExpo,
};

/** Staggered container — children animate in sequence */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Text line reveal — clips from below */
export const lineReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 1,
      ease: easeOutExpo,
    },
  },
};

/** Fade up — generic entrance */
export const fadeUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: easeOutExpo,
    },
  },
};

/** Scale in with fade */
export const scaleIn: Variants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeOutExpo,
    },
  },
};

/** Horizontal slide in from left */
export const slideInLeft: Variants = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: easeOutExpo,
    },
  },
};

/** Horizontal slide in from right */
export const slideInRight: Variants = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: easeOutExpo,
    },
  },
};

/** Page transition overlay wipe */
export const pageTransition: Variants = {
  initial: { scaleY: 0, transformOrigin: 'bottom' },
  animate: { scaleY: 1, transformOrigin: 'bottom', transition: { duration: 0.6, ease: easeInOutExpo } },
  exit: { scaleY: 0, transformOrigin: 'top', transition: { duration: 0.6, ease: easeInOutExpo } },
};

/** Page content — fades in after transition */
export const pageContent: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo, delay: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: easeInOutExpo },
  },
};
