/**
 * Animated text reveal component.
 * Splits text into lines and reveals each with a clipping animation.
 * Uses Intersection Observer to trigger when element enters viewport.
 *
 * @param text - The text string to animate
 * @param tag - HTML element tag to render (h1, h2, p, span, etc.)
 * @param className - Optional CSS class
 * @param delay - Delay before animation starts (seconds)
 */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { easeOutExpo } from '../utils/animations';

interface TextRevealProps {
  text: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className,
  delay = 0,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const words = text.split(' ');
  const lines: string[][] = [];
  let currentLine: string[] = [];

  // Simple line-breaking by grouping words (6 per visual line as fallback)
  words.forEach((word, i) => {
    currentLine.push(word);
    if ((i + 1) % 6 === 0 || i === words.length - 1) {
      lines.push([...currentLine]);
      currentLine = [];
    }
  });

  return (
    <div ref={ref} style={style}>
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} style={{ overflow: 'hidden', lineHeight: 1.1 }}>
          <motion.span
            className={className}
            style={{ display: 'block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 1,
              ease: easeOutExpo,
              delay: delay + lineIdx * 0.08,
            }}
          >
            {line.join(' ')}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

export default TextReveal;
