/**
 * Custom cursor component that replaces the system cursor.
 * Features:
 * - Small dot that follows mouse precisely
 * - Larger trailing ring with spring lag
 * - Expands and inverts on hoverable elements
 * - Text mode when hovering links
 */
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 50, mass: 0.1 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 50, mass: 0.1 });

  const trailX = useSpring(cursorX, { stiffness: 120, damping: 22, mass: 0.5 });
  const trailY = useSpring(cursorY, { stiffness: 120, damping: 22, mass: 0.5 });

  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const addHoverListeners = () => {
      const els = document.querySelectorAll('a, button, [data-cursor-hover]');
      els.forEach(el => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', () => setClicking(true));
    window.addEventListener('mouseup', () => setClicking(false));
    addHoverListeners();

    // Observe DOM mutations to re-attach listeners on dynamic content
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Precise dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          zIndex: 9999,
          pointerEvents: 'none',
          width: hovered ? 8 : 6,
          height: hovered ? 8 : 6,
          borderRadius: '50%',
          background: 'var(--color-accent)',
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      {/* Trailing ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: trailX,
          top: trailY,
          x: '-50%',
          y: '-50%',
          zIndex: 9998,
          pointerEvents: 'none',
          borderRadius: '50%',
          border: '1.5px solid rgba(240,237,232,0.5)',
          mixBlendMode: 'difference',
        }}
        animate={{
          width: hovered ? 56 : clicking ? 16 : 32,
          height: hovered ? 56 : clicking ? 16 : 32,
          opacity: hovered ? 0.8 : 0.4,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;
