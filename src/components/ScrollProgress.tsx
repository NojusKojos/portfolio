/**
 * Horizontal scroll progress bar displayed at the top of the viewport.
 * Animates its width from 0% to 100% as the user scrolls the page.
 */
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--color-primary)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 9000,
      }}
    />
  );
};

export default ScrollProgress;
