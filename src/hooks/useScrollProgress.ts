/**
 * Hook that returns the current page scroll progress as a value from 0 to 1.
 * Used to drive scroll-based animations and the progress bar.
 */
import { useEffect, useState } from 'react';

export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      setProgress(Math.min(window.scrollY / totalScrollable, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};
