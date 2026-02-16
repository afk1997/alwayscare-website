/**
 * Shared Framer Motion animation variants and config.
 * Used across all sections for consistent, per-element viewport-triggered reveals.
 */

/* ── Variants ── */

export const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export const dramatic = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.6, filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -50, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
};

export const slideRight = {
  hidden: { opacity: 0, x: 50, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
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
  variant: Record<string, unknown>,
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
