/**
 * Creative button — Awwwards-style rounded button with:
 * - Magnetic cursor-follow effect
 * - Background fill animation (circle expand from center)
 * - Text slide animation on hover (text slides up, duplicate enters from below)
 * - Rounded pill shape
 *
 * Inspired by Olivier Larose's creative button patterns.
 */
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CreativeButtonProps {
  children: React.ReactNode;
  /** Background color (default: transparent with border) */
  bg?: string;
  /** Background color on hover */
  hoverBg?: string;
  /** Text color */
  color?: string;
  /** Text color on hover */
  hoverColor?: string;
  /** Border color */
  borderColor?: string;
  /** Magnetic strength (0–1) */
  strength?: number;
  /** Additional inline styles on the outer wrapper */
  style?: React.CSSProperties;
  /** Click handler */
  onClick?: () => void;
  /** If provided, renders as an <a> tag */
  href?: string;
  /** Open in new tab */
  target?: string;
  /** rel attribute */
  rel?: string;
}

const CreativeButton: React.FC<CreativeButtonProps> = ({
  children,
  bg = 'transparent',
  hoverBg = 'var(--color-text)',
  color = 'var(--color-text)',
  hoverColor = 'var(--color-bg)',
  borderColor = 'var(--color-text)',
  strength = 0.3,
  style,
  onClick,
  href,
  target,
  rel,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

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
    setHovered(false);
  };

  const innerContent = (
    <>
      {/* Background fill circle that scales up on hover */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '100px',
          background: hoverBg,
          transformOrigin: 'center',
        }}
        initial={false}
        animate={{ scale: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Text with slide animation */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        <motion.div
          animate={{ y: hovered ? '-100%' : '0%' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {children}
        </motion.div>
        <motion.div
          animate={{ y: hovered ? '-100%' : '0%' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: hoverColor,
          }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );

  const sharedStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 2.5rem',
    borderRadius: '100px',
    border: `1px solid ${borderColor}`,
    background: bg,
    color: color,
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    textDecoration: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    ...style,
  };

  return (
    <motion.div
      ref={ref}
      style={{ display: 'inline-block' }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
    >
      {href ? (
        <a href={href} target={target} rel={rel} onClick={onClick} style={sharedStyle}>
          {innerContent}
        </a>
      ) : (
        <button type="button" onClick={onClick} style={{ ...sharedStyle, border: `1px solid ${borderColor}` }}>
          {innerContent}
        </button>
      )}
    </motion.div>
  );
};

export default CreativeButton;
