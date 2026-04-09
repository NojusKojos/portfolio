/**
 * Music page — full discography and Spotify stream integration.
 *
 * Sections:
 * 1. Page hero
 * 2. Spotify artist embed — full player
 * 3. Releases grid — track list with details
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { staggerContainer, fadeUp, easeOutExpo } from '../utils/animations';

interface Track {
  title: string;
  duration: string;
  year: string;
  genre: string;
}

const TRACKS: Track[] = [
  { title: 'Echoes in Static', duration: '4:32', year: '2024', genre: 'Ambient' },
  { title: 'Peripheral Vision', duration: '5:18', year: '2023', genre: 'Electronic' },
  { title: 'Drift (Extended)', duration: '7:44', year: '2023', genre: 'Ambient' },
  { title: 'Threshold', duration: '3:56', year: '2023', genre: 'Experimental' },
  { title: 'Before the Signal', duration: '6:12', year: '2022', genre: 'Ambient' },
  { title: 'Residue', duration: '4:08', year: '2022', genre: 'Electronic' },
  { title: 'Cascade', duration: '5:55', year: '2021', genre: 'Electronic' },
  { title: 'Quiet Architecture', duration: '8:23', year: '2021', genre: 'Ambient' },
];

const Music: React.FC = () => {
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);

  return (
    <div style={{ paddingTop: '80px' }}>
      <SEO
        title="Music"
        description="Explore the discography of Nojus Peciukonis — electronic, ambient, and experimental sound design releases."
        path="/music"
      />
      {/* Hero */}
      <section style={{ padding: 'var(--space-xl) var(--margin)', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-primary)', marginBottom: '1.5rem' }}
          >

          </motion.p>

          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.1 }}
              style={{ fontFamily: 'var(--font-hero)', fontSize: 'var(--text-3xl)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.88, color: 'var(--color-text)' }}
            >
              Releases
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.18 }}
              style={{ fontFamily: 'var(--font-hero)', fontSize: 'var(--text-3xl)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.88, color: 'var(--color-text)' }}
            >
              & Works
            </motion.h1>
          </div>
        </div>
      </section>

      {/* bg shift separator */}

      {/* Spotify embed */}
      <section style={{ padding: 'var(--space-xl) var(--margin)', background: 'var(--color-bg-alt)' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            <iframe
              style={{ border: 'none', display: 'block' }}
              src="https://open.spotify.com/embed/artist/5DCeuEaJI3qICAOZOQde0I?utm_source=generator&theme=0"
              width="100%"
              height="450"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Nojus Peciukonis on Spotify"
            />
          </motion.div>
        </div>
      </section>

      {/* Track list */}
      <section style={{ padding: 'var(--space-xl) var(--margin)' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {/* Header row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto auto auto', gap: '1rem', padding: '0 0 1rem 0', marginBottom: '0.5rem' }}
          >
            {['#', 'Title', 'Genre', 'Year', 'Duration'].map(h => (
              <span key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-muted)' }}>{h}</span>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {TRACKS.map((track, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                onMouseEnter={() => setHoveredTrack(i)}
                onMouseLeave={() => setHoveredTrack(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr auto auto auto',
                  gap: '1rem',
                  padding: '1.25rem 0',
                  alignItems: 'center',
                  cursor: 'pointer',
                  background: hoveredTrack === i ? 'var(--color-surface)' : 'transparent',
                  transition: 'background 0.25s',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: hoveredTrack === i ? 'var(--color-accent)' : 'var(--color-text-muted)', transition: 'color 0.25s' }}>
                  {hoveredTrack === i ? '▶' : String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: hoveredTrack === i ? 'var(--color-text)' : 'var(--color-text-secondary)', transition: 'color 0.25s' }}>
                  {track.title}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>
                  {track.genre}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                  {track.year}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                  {track.duration}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Music;
