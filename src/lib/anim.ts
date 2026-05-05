/**
 * Shared scroll-animation constants used across every page.
 * Import: import { EXPO, FU, FL, FR, SC, STAGGER } from '@/lib/anim';
 */

export const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Fade-up with blur */
export const FU = (delay = 0, distance = 56) => ({
  hidden: { opacity: 0, y: distance, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EXPO, delay },
  },
});

/** Fade-left (slide from left) with blur */
export const FL = (delay = 0) => ({
  hidden: { opacity: 0, x: -80, filter: 'blur(6px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EXPO, delay },
  },
});

/** Fade-right (slide from right) with blur */
export const FR = (delay = 0) => ({
  hidden: { opacity: 0, x: 80, filter: 'blur(6px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EXPO, delay },
  },
});

/** Scale up with blur */
export const SC = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.88, filter: 'blur(4px)' },
  visible: {
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EXPO, delay },
  },
});

/** Stagger container */
export const STAGGER = (staggerDelay = 0.09) => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerDelay, delayChildren: 0.05 } },
});

/** Light fade-up — for places where blur would feel too heavy */
export const FU_LIGHT = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: EXPO, delay },
  },
});
