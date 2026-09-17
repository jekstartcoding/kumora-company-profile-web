import { useEffect, useRef } from 'react';

/**
 * Thin scroll-progress bar sitting flush on top of the BottomNav.
 * Writes scaleX directly to the element from a passive scroll listener
 * (no re-render, no per-frame React work), so it stays smooth and — unlike
 * a framer-motion driven bar — keeps working when rAF is throttled.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const bar = barRef.current;
      if (!bar) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 z-50 h-0.5 px-2"
      style={{ bottom: 'calc(var(--bottom-nav-h, 72px) + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="h-full w-full overflow-hidden rounded-full bg-rose/50">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-plum"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  );
}
