import { useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // retrigger container enter animation
    el.classList.remove('page-enter');
    // force reflow
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    void el.offsetWidth;
    el.classList.add('page-enter');
    return () => {};
    // re-run on location change
  }, [location.pathname]);

  return (
    <div ref={containerRef} className="page-enter flex-1">
      {children}
    </div>
  );
}
