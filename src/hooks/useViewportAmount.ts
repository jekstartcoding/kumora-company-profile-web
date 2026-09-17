import { useEffect, useState } from 'react';

/**
 * Returns an `amount` for Framer Motion viewport triggers
 * tailored to the current screen size.
 *
 * Mobile (< 640px): 0.05 — triggers almost immediately when scrolling into view
 * Tablet (640–1023px): 0.10
 * Desktop (>= 1024px): 0.15
 */
export function useViewportAmount(): number {
  const [amount, setAmount] = useState<number>(() => {
    if (typeof window === 'undefined') return 0.1;
    const w = window.innerWidth;
    if (w < 640) return 0.05;
    if (w < 1024) return 0.1;
    return 0.15;
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setAmount(0.05);
      else if (w < 1024) setAmount(0.1);
      else setAmount(0.15);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return amount;
}
