/**
 * Shared scroll-animation constants used across every page.
 * Import: import { EXPO, FU, FL, FR, SC, STAGGER } from '@/lib/anim';
 *
 * NOTE: filter:blur() removed from all variants — it causes non-composited
 * animations which hurt CLS and performance scores. Using opacity+transform only.
 */

export const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Fade-up */
export const FU = (delay = 0, distance = 48) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: EXPO, delay },
  },
});

/** Fade-left (slide from left) */
export const FL = (delay = 0) => ({
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: EXPO, delay },
  },
});

/** Fade-right (slide from right) */
export const FR = (delay = 0) => ({
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: EXPO, delay },
  },
});

/** Scale up */
export const SC = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: EXPO, delay },
  },
});

/** Stagger container */
export const STAGGER = (staggerDelay = 0.09) => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerDelay, delayChildren: 0.05 } },
});

/** Light fade-up */
export const FU_LIGHT = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: EXPO, delay },
  },
});
