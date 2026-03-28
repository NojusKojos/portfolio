/**
 * Hook that tracks the mouse position and returns normalized coordinates.
 * Used for the custom cursor and magnetic button effects.
 */
import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
  /** Normalized -1 to 1 relative to viewport center */
  nx: number;
  ny: number;
}

export const useMousePosition = (): MousePosition => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / window.innerWidth) * 2 - 1,
        ny: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};
