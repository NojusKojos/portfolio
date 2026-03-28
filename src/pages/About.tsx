/**
 * About page — editorial biography and artist statement.
 *
 * Sections:
 * 1. Page hero — full-width name with animated entrance
 * 2. Bio — two-column text layout (Swiss grid)
 * 3. Timeline — numbered milestones in artist career
 * 4. Influences grid — visual collage of influences
 * 5. CTA — collaboration prompt
 */
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import TextReveal from '../components/TextReveal';
import MarqueeText from '../components/MarqueeText';
import MagneticButton from '../components/MagneticButton';
import { fadeUp, staggerContainer, easeOutExpo } from '../utils/animations';

interface TimelineItem {
  year: string;
  event: string;
  detail: string;
}

const TIMELINE: TimelineItem[] = [
  { year: '2020', event: 'First Releases', detail: 'Began publishing experimental electronic compositions on SoundCloud and Spotify.' },
  { year: '2021', event: 'Sound Design Work', detail: 'Expanded into sound design for digital projects, exploring the intersection of texture and space.' },
  { year: '2022', event: 'International Reach', detail: 'Music reached listeners across 12+ countries, gaining recognition in ambient and electronic circles.' },
  { year: '2023', event: 'Prolific Period', detail: 'Released multiple projects including "Drift" and "Peripheral", cementing a signature sonic identity.' },
  { year: '2024', event: 'Continued Evolution', detail: 'Ongoing exploration of electronic composition, production techniques, and live performance.' },
];

const INFLUENCES = [
  'Brian Eno', 'Burial', 'Arca', 'Jon Hopkins', 'Aphex Twin', 'Max Richter',
  'William Basinski', 'Four Tet', 'Nils Frahm', 'Floating Points',
];

const About: React.FC = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section ref={heroRef} style={{ padding: 'var(--space-xl) var(--margin)', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', inset: '-10%', y: heroY, background: 'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(0,36,193,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

        {/* Portrait image — editorial offset on right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.4 }}
          style={{
            position: 'absolute',
            left: 'clamp(300px, 40vw, 550px)',
            bottom: 'var(--space-lg)',
            width: 'clamp(220px, 28vw, 420px)',
            aspectRatio: '3/4',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <img
            src="/images/portrait.png"
            alt="Nojus Pečiukonis"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%)',
            }}
          />
        </motion.div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.15 }}
              style={{ fontFamily: 'var(--font-hero)', fontSize: 'var(--text-3xl)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.88, color: 'var(--color-text)' }}
            >
              About
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.22 }}
              style={{ fontFamily: 'var(--font-hero)', fontSize: 'var(--text-3xl)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.88, color: 'var(--color-text)' }}
            >
              Me
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Background shift separator */}

      {/* ================================================================
          BIO — Two column
          ================================================================ */}
      <section style={{ padding: 'var(--space-xl) var(--margin)' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)', alignItems: 'start' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
              Profile
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.3 }}>
              Nojus Peciukonis
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
              Lithuania
            </p>

            <div style={{ marginTop: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[['Genre', 'Electronic / Ambient'], ['Role', 'Artist · Producer'], ['Active', '2020 — Present']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', background: 'var(--color-bg-alt)', padding: '0.5rem 0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.2 }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', lineHeight: 1.75, color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
              Nojus Peciukonis is a music artist and producer from Lithuania whose work inhabits the space between electronic music, ambient texture, and experimental sound design. Drawing from the traditions of minimalist composition and contemporary electronic production, his music is built around the interplay of space, silence, and subtle complexity.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', lineHeight: 1.75, color: 'var(--color-text-secondary)' }}>
              Each release is a carefully constructed sonic environment — layers of synthesizer, processed field recordings, and rhythmic structures that breathe rather than pulse. The work resists easy categorization, sitting at the intersection of the physical and the digital, the intimate and the expansive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ padding: '1rem 0', background: 'var(--color-bg-alt)' }}>
        <MarqueeText
          text="ELECTRONIC · AMBIENT · EXPERIMENTAL · PRODUCER · SOUND DESIGN · LITHUANIA"
          speed={30}
          direction="right"
          style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--color-text-muted)' }}
        />
      </div>

      {/* ================================================================
          TIMELINE
          ================================================================ */}
      <section style={{ padding: 'var(--space-xl) var(--margin)' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            style={{ marginBottom: 'var(--space-lg)' }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              Career Arc
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Milestones
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 2fr',
                  gap: '2rem',
                  alignItems: 'start',
                  padding: '2rem 0',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-primary)', paddingTop: '0.2rem' }}>{item.year}</span>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>{item.event}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{item.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          INFLUENCES
          ================================================================ */}
      <section style={{ padding: 'var(--space-xl) var(--margin)', background: 'var(--color-bg-alt)' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}
          >
            Sonic Influences
          </motion.p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {INFLUENCES.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: easeOutExpo }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-lg)',
                  color: i % 3 === 0 ? 'var(--color-text)' : 'var(--color-text-muted)',
                  letterSpacing: '-0.02em',
                }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
          ================================================================ */}
      <section style={{ padding: 'var(--space-xl) var(--margin)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
        <TextReveal
          text="Ready to collaborate?"
          tag="h2"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 'var(--space-md)' }}
        />
        <MagneticButton>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.25rem 3rem',
              background: 'var(--color-accent)',
              color: 'var(--color-accent-text)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Get in touch
          </Link>
        </MagneticButton>
      </section>

      <Footer />
    </div>
  );
};

export default About;
