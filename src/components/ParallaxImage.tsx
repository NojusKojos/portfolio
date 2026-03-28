/**
 * Parallax image container.
 * The image moves at a slower rate than the scroll, creating depth.
 * Uses framer-motion's useScroll + useTransform for smooth performance.
 *
 * @param src - Image source URL
 * @param alt - Alt text
 * @param factor - Parallax factor (0 = no parallax, 1 = 1:1 with scroll)
 */
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  factor?: number;
  className?: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  factor = 0.15,
  className,
  style,
  containerStyle,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-factor * 100}%`, `${factor * 100}%`]);

  return (
    <div
      ref={ref}
      style={{ overflow: 'hidden', position: 'relative', ...containerStyle }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={className}
        style={{
          width: '100%',
          height: '115%',
          objectFit: 'cover',
          y,
          willChange: 'transform',
          ...style,
        }}
      />
    </div>
  );
};

export default ParallaxImage;
