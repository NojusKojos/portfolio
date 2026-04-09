/**
 * Site footer — locomotive.ca-inspired editorial footer.
 * Features:
 * - "NOJUS" geometric → text reveal on scroll
 * - Multi-column link grid with top-border headers
 * - Large typographic contact lockup at the bottom
 * - Copyright stamp
 */
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { easeOutExpo } from '../utils/animations';

/* ── NOJUS geometric graphic above footer ── */

const NojusGraphic: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 'var(--space-xl) var(--margin)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '35vh',
        cursor: 'default',
      }}
    >
      {/* Geometric shapes — black in light mode, white in dark mode via var(--color-text) */}
      <motion.svg
        viewBox="0 0 800 200"
        animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.95 : 1 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{
          width: '80%',
          maxWidth: '900px',
          fill: 'var(--color-text)',
        }}
      >
        {/* N */}
        <rect x="30" y="40" width="90" height="120" rx="4" />
        <rect x="130" y="40" width="70" height="120" rx="4" />
        <circle cx="155" cy="35" r="14" />
        <circle cx="30" cy="165" r="14" />
        {/* O */}
        <rect x="225" y="40" width="100" height="120" rx="4" />
        <circle cx="275" cy="35" r="14" />
        <circle cx="275" cy="165" r="14" />
        {/* J */}
        <rect x="355" y="40" width="90" height="120" rx="4" />
        <circle cx="400" cy="35" r="14" />
        <circle cx="355" cy="165" r="14" />
        {/* U */}
        <rect x="475" y="40" width="90" height="120" rx="4" />
        <circle cx="520" cy="35" r="14" />
        <circle cx="475" cy="165" r="14" />
        {/* S */}
        <rect x="595" y="40" width="100" height="120" rx="4" />
        <circle cx="695" cy="100" r="14" />
        <circle cx="645" cy="35" r="14" />
      </motion.svg>

      {/* Text layer — appears on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 30 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(4rem, 15vw, 16rem)',
            fontWeight: 400,
            letterSpacing: '-0.04em',
            color: 'var(--color-text)',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          NOJUS
        </h2>
      </motion.div>
    </div>
  );
};

const FOOTER_COLUMNS = [
  {
    label: 'Menu',
    span: 2,
    links: [
      { name: 'Home', href: '/', internal: true },
      { name: 'About', href: '/about', internal: true },
      { name: 'Music', href: '/music', internal: true },
      { name: 'Contact', href: '/contact', internal: true },
    ],
  },
  {
    label: 'Social',
    span: 1,
    links: [
      { name: 'Instagram', href: 'https://www.instagram.com/nojus.pe/', internal: false },
      { name: 'YouTube', href: 'https://www.youtube.com/channel/UC-JWR2_aLhvRqElHDKPi5cw', internal: false },
    ],
  },
  {
    label: 'Music',
    span: 1,
    links: [
      { name: 'Apple Music', href: 'https://music.apple.com/ca/artist/nojus-peciukonis/1795554940', internal: false },
      { name: 'Spotify', href: 'https://open.spotify.com/artist/5DCeuEaJI3qICAOZOQde0I', internal: false },
    ],
  },
];

const Footer: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <footer ref={ref} style={{
      background: 'var(--color-bg)',
    }}>
      <div style={{ maxWidth: '100%', margin: '0 auto', padding: '0 var(--margin) 0' }}>

        {/* ── Column grid with top-border headers ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
        }}>
          {FOOTER_COLUMNS.map((col, colIdx) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: colIdx * 0.08 }}
              style={{
                gridColumn: col.span === 2 ? 'span 2' : 'span 1',
                paddingRight: 'var(--grid-gap)',
              }}
            >
              {/* Column header — above the line */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.6rem',
                color: 'var(--color-text)',
                paddingBottom: '1.25rem',
              }}>
                {col.label}
              </p>

              {/* Divider line */}
              <div style={{ height: '1px', background: 'var(--color-text)', marginBottom: '2rem' }} />

              {/* Column links — below the line */}
              <div style={{
                display: col.span === 2 ? 'grid' : 'flex',
                gridTemplateColumns: col.span === 2 ? '1fr 1fr' : undefined,
                flexDirection: col.span === 2 ? undefined : 'column',
                gap: '1rem',
                paddingBottom: 'var(--space-lg)',
              }}>
                {col.links.map(link => (
                  <div key={link.name}>
                    {link.internal ? (
                      <Link
                        to={link.href}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '1.5rem',
                          color: 'var(--color-text)',
                          transition: 'color 0.2s',
                          textDecoration: 'none',
                        }}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '1.5rem',
                          color: 'var(--color-text)',
                          transition: 'color 0.2s',
                          textDecoration: 'none',
                        }}
                      >
                        {link.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom section: NOJUS graphic ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: easeOutExpo, delay: 0.3 }}
          style={{ marginTop: 'var(--space-lg)', marginBottom: '-4px', display: 'flex', justifyContent: 'center' }}
        >
          <img
            src="/images/nojus_black.png"
            alt="NOJUS"
            className="nojus-logo-light"
            style={{ width: '45%', maxWidth: '800px', userSelect: 'none', display: 'block' }}
          />
          <img
            src="/images/nojus_white.png"
            alt="NOJUS"
            className="nojus-logo-dark"
            style={{ width: '45%', maxWidth: '800px', userSelect: 'none' }}
          />
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
