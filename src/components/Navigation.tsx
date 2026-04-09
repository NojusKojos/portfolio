/**
 * Site-wide navigation — Awwwards-style expanding side menu.
 * Features:
 * - Fixed nav bar with logo + controls
 * - Rounded rectangle that expands from the menu button
 * - 3D perspective link entrance animations
 * - Perspective text flip on the menu button
 * - Theme toggle
 */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { easeOutExpo } from '../utils/animations';

/* ── Data ── */

interface NavLink {
  label: string;
  path: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Music', path: '/music' },
  { label: 'Contact', path: '/contact' },
];

const SOCIAL_LINKS = [
  
];

/* ── Animation variants ── */

const menuVariants = {
  open: {
    width: 480,
    height: 650,
    top: -25,
    right: -25,
    transition: { duration: 0.75, type: 'tween', ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: 100,
    height: 40,
    top: 0,
    right: 0,
    transition: { duration: 0.75, delay: 0.35, type: 'tween', ease: [0.76, 0, 0.24, 1] },
  },
};

const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
    translateX: -20,
  },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      type: 'tween',
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] },
  },
};

const slideIn = {
  initial: { opacity: 0, y: 20 },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      type: 'tween',
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3, type: 'tween', ease: [0.76, 0, 0.24, 1] },
  },
};

/* ── Perspective Text sub-component ── */

const PerspectiveText: React.FC<{ label: string }> = ({ label }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
  }}>
    <p style={{
      transition: 'all 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
      pointerEvents: 'none',
      textTransform: 'uppercase',
    }}>{label}</p>
    <p style={{
      position: 'absolute',
      transformOrigin: 'bottom center',
      transform: 'rotateX(-90deg) translateY(9px)',
      opacity: 0,
      transition: 'all 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
      pointerEvents: 'none',
      textTransform: 'uppercase',
    }}>{label}</p>
  </div>
);

/* ── Main Navigation ── */

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '16px var(--margin)' : '28px var(--margin)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'padding 0.4s var(--ease-out-expo)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: scrolled ? 'var(--nav-glass)' : 'transparent',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.2 }}
      >
        {/* Logo */}
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--color-text)' }}>
          NP
        </Link>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', cursor: 'pointer', color: 'var(--color-text)' }}
            aria-label="Toggle dark mode"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
            >
              {theme === 'light' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              )}
            </motion.div>
          </button>

          {/* ── Expanding menu container ── */}
          <div style={{ position: 'relative' }}>
            {/* The expanding rounded rectangle */}
            <motion.div
              variants={menuVariants}
              animate={menuOpen ? 'open' : 'closed'}
              initial="closed"
              style={{
                position: 'absolute',
                width: 100,
                height: 40,
                background: 'var(--color-accent)',
                borderRadius: 25,
                overflow: 'hidden',
                zIndex: 1,
              }}
            >
              {/* Menu content — only visible when open */}
              <AnimatePresence>
                {menuOpen && (
                  <div style={{
                    height: '100%',
                    padding: '80px 40px 50px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                  }}>
                    {/* Nav links with perspective animation */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {NAV_LINKS.map((link, i) => (
                        <div key={link.path} style={{ perspective: '120px', perspectiveOrigin: 'bottom' }}>
                          <motion.div
                            custom={i}
                            variants={perspective}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                          >
                            <Link
                              to={link.path}
                              onClick={() => setMenuOpen(false)}
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: location.pathname === link.path ? '#ffffff' : 'var(--color-accent-text)',
                                textDecoration: 'none',
                                display: 'block',
                              }}
                            >
                              {link.label}
                            </Link>
                          </motion.div>
                        </div>
                      ))}
                    </div>

                    {/* Footer social links */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                      {SOCIAL_LINKS.map((link, i) => (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          custom={i}
                          variants={slideIn}
                          initial="initial"
                          animate="enter"
                          exit="exit"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: 'rgba(0,0,0,0.5)',
                            textDecoration: 'none',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {link.label}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* The button — sits on top of the pill */}
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                position: 'relative',
                zIndex: 2,
                width: 100,
                height: 40,
                borderRadius: 25,
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.div
                animate={{ top: menuOpen ? '-100%' : '0%' }}
                transition={{ duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] }}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                }}
              >
                {/* "Menu" face */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-text)',
                }}>
                  <PerspectiveText label="Menu" />
                </div>
                {/* "Close" face */}
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-text)',
                }}>
                  <PerspectiveText label="Close" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navigation;
