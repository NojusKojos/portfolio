/**
 * Hook that computes a parallax offset based on scroll position.
 * Returns a y offset value multiplied by the given factor.
 *
 * @param factor - Parallax intensity. Positive = same direction as scroll, negative = opposite.
 */
import { useEffect, useState } from 'react';

export const useParallax = (factor: number = 0.3): number => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * factor);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [factor]);

  return offset;
};
