/**
 * Infinitely scrolling horizontal marquee text.
 * A classic editorial web design element for atmosphere and branding.
 *
 * @param text - Text to repeat in the marquee
 * @param speed - Animation duration in seconds (lower = faster)
 * @param direction - Scroll direction ('left' | 'right')
 */
import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeTextProps {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
  style?: React.CSSProperties;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  speed = 20,
  direction = 'left',
  style,
}) => {
  const repeats = 8;
  const dirMultiplier = direction === 'left' ? -1 : 1;

  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <motion.div
        style={{ display: 'inline-flex', gap: '0' }}
        animate={{ x: dirMultiplier < 0 ? '-50%' : '0%' }}
        initial={{ x: dirMultiplier < 0 ? '0%' : '-50%' }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {Array.from({ length: repeats }).map((_, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              paddingRight: '0.5em',
              ...style,
            }}
          >
            {text}&nbsp;—&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeText;
