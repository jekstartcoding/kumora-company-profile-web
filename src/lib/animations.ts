import { Variants } from 'framer-motion';

// Single source of truth for the motion language.
// Keep the surface tiny: every component reads from here.

export const ease = [0.22, 1, 0.36, 1] as const;     // entrance
export const easeOut = [0.4, 0, 1, 1] as const;       // exit / settling

// Page transitions should feel like replacement, not a slide presentation.
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.22, ease: easeOut },
  },
};

// Stagger kept short and capped. Use this only for visually grouped sets.
export const staggerContainer = (stagger = 0.06): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: 0.04 },
  },
});

// Default content reveal. Same shape for headings, cards, paragraphs.
// Keep translate small and duration consistent across the site.
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease },
  },
};

// Gentle hover for product cards. Image is the focal point, card stays calm.
export const productHover = {
  rest: { y: 0 },
  hover: { y: -2, transition: { duration: 0.28, ease: easeOut } },
} as const;

export const productImageHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.6, ease: easeOut } },
} as const;
