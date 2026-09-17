/**
 * Motion preference.
 *
 * Animations are intentionally ALWAYS on for this prototype, regardless of
 * the OS/browser `prefers-reduced-motion: reduce` setting. That flag was
 * silently muting every animation on machines where it is forced on
 * (e.g. Windows "Animation effects" turned off), which made the motion
 * design impossible to review.
 *
 * This hook keeps the same signature as framer-motion's `useReducedMotion`,
 * so every call site works unchanged — it simply always reports that motion
 * is allowed. If accessibility-respecting behaviour is ever needed again,
 * swap this back for framer-motion's hook or reintroduce a persisted
 * user-facing override.
 */
export function useReducedMotion(): boolean {
  return false;
}
