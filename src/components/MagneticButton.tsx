/**
 * Magnetic button component — the element follows the cursor when hovered nearby.
 * Classic AWWWARDS interaction pattern.
 *
 * @param children - Button content
 * @param className - Optional CSS class
 * @param onClick - Click handler
 * @param strength - How strongly the element is pulled toward cursor (0–1)
 */
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  style?: React.CSSProperties;
  href?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  onClick,
  strength = 0.4,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ display: 'inline-block', ...style }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
