/**
 * Site footer — inspired by locomotive.ca's editorial footer design.
 * Features:
 * - Multi-column link grid (Swiss layout)
 * - Large typographic logo lockup
 * - Social links
 * - Copyright
 */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { easeOutExpo } from '../utils/animations';

const Footer: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <footer ref={ref} style={{
      background: 'var(--color-bg-alt)',
      padding: 'var(--space-xl) var(--margin) var(--space-lg)',
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'var(--grid-gap)',
          marginBottom: 'var(--space-xl)',
          paddingBottom: 'var(--space-lg)',
        }}>
          {[
            { label: 'Menu', links: ['Home', 'About', 'Music', 'Contact'] },
            { label: 'Music', links: ['Spotify', 'SoundCloud', 'Apple Music', 'Bandcamp'] },
            { label: 'Social', links: ['Instagram', 'TikTok', 'YouTube', 'Twitter'] },
          ].map(col => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: easeOutExpo }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                {col.label}
              </p>
              {col.links.map(link => (
                <div key={link} style={{ marginBottom: '0.6rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}>
                    {link}
                  </span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Big typographic lockup */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: easeOutExpo }}
        >
          <p style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'var(--text-hero)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,36,193,0.12)',
            marginBottom: 'var(--space-lg)',
            userSelect: 'none',
          }}>
            NOJUS
          </p>
        </motion.div>

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
            Nojus Peciukonis — Music Artist
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
            ©{new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
