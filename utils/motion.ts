/**
 * Shared Framer Motion animation variants and config.
 * Used across all sections for consistent, per-element viewport-triggered reveals.
 */

import type { Variants } from 'framer-motion';

/* ── Variants ── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const dramatic: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1 },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

/* ── Shared config ── */

export const ease = [0.22, 1, 0.36, 1] as const;

export const viewport = { once: true, margin: '-10%' as const };

export const transition = { duration: 0.7, ease };

/**
 * Helper: returns Framer Motion props for a single element with whileInView.
 * When reduced motion is preferred, returns empty object (renders as static).
 */
export function motionProps(
  variant: Variants,
  prefersReducedMotion: boolean | null,
  overrides?: { transition?: Record<string, unknown> },
) {
  if (prefersReducedMotion) return {};
  return {
    variants: variant,
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport,
    transition: overrides?.transition ?? transition,
  };
}

/**
 * Helper: returns Framer Motion props for a stagger container.
 */
export function staggerProps(
  prefersReducedMotion: boolean | null,
  staggerDelay = 0.1,
) {
  if (prefersReducedMotion) return {};
  return {
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport,
    transition: { staggerChildren: staggerDelay },
  };
}
