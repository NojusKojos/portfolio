/**
 * Site-wide navigation component.
 * Features:
 * - Fixed position with blur backdrop
 * - Logo on left, nav links on right
 * - Hamburger menu for mobile overlay
 * - Animates on scroll (compact mode after threshold)
 * - Full-screen overlay menu with staggered link animations
 */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { staggerContainer, lineReveal, easeOutExpo } from '../utils/animations';

interface NavLink {
  label: string;
  path: string;
  index: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/', index: '01' },
  { label: 'About', path: '/about', index: '02' },
  { label: 'Music', path: '/music', index: '03' },
  { label: 'Contact', path: '/contact', index: '04' },
];

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  // Close menu on route change
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
          background: scrolled ? 'rgba(255,255,255,0.70)' : 'transparent',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.2 }}
      >
        {/* Logo */}
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--color-text)' }}>
          NP
        </Link>

        {/* Menu toggle */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px', cursor: 'pointer' }}
            aria-label="Toggle menu"
          >
            <motion.span
              style={{ display: 'block', width: '24px', height: '1.5px', background: 'var(--color-text)', transformOrigin: 'center' }}
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
            />
            <motion.span
              style={{ display: 'block', width: '24px', height: '1.5px', background: 'var(--color-text)', transformOrigin: 'center' }}
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              style={{ display: 'block', width: '24px', height: '1.5px', background: 'var(--color-text)', transformOrigin: 'center' }}
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 900,
              background: 'var(--color-bg-alt)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'var(--margin)',
            }}
          >
            {/* Grid lines */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(0,36,193,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,36,193,0.04) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              pointerEvents: 'none',
            }} />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ position: 'relative', zIndex: 1 }}
            >
              {NAV_LINKS.map((link) => (
                <div key={link.path} style={{ overflow: 'hidden', padding: '1.5rem 0' }}>
                  <motion.div variants={lineReveal}>
                    <Link
                      to={link.path}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '1.5rem',
                        color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text)',
                        transition: 'color 0.2s',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{link.index}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </motion.div>

            {/* Footer of overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: easeOutExpo }}
              style={{
                position: 'absolute',
                bottom: 'var(--margin)',
                left: 'var(--margin)',
                right: 'var(--margin)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Follow</p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  {['Spotify', 'Instagram', 'SoundCloud'].map(s => (
                    <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{s}</span>
                  ))}
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>©{new Date().getFullYear()}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default Navigation;
