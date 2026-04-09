/**
 * Home page — the main landing experience.
 *
 * Sections:
 * 1. Hero — Full viewport typographic entrance with parallax
 * 2. Marquee strip — Scrolling text brand identity
 * 3. Featured Releases — Grid of releases with hover interactions
 * 4. Statement — Large bold manifesto with background image
 * 5. Stats — Animated numeric counters in Swiss grid
 * 6. Spotify embed — Direct stream integration
 * 7. Quote — Editorial pull quote
 */
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import TextReveal from '../components/TextReveal';
import CreativeButton from '../components/CreativeButton';
import Footer from '../components/Footer';
import { fadeUp, staggerContainer, easeOutExpo } from '../utils/animations';

/** Individual release card data */
interface Release {
  id: string;
  title: string;
  year: string;
  genre: string;
  index: string;
  color: string;
}

const RELEASES: Release[] = [
  { id: '1', title: 'The Little Things in Life', year: '2025', genre: 'Ambient / Botanica', index: '001', color: '#0024c1' },
];

/** Animated stat counter component */
const StatCounter: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <div ref={ref} style={{ paddingLeft: '2rem' }}>
      <motion.p
        style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--color-primary)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: easeOutExpo }}
      >
        {count.toLocaleString()}{suffix}
      </motion.p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
        {label}
      </p>
    </div>
  );
};

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.08]);

  const stmtRef = useRef(null);
  const { scrollYProgress: stmtScroll } = useScroll({ target: stmtRef, offset: ['start end', 'end start'] });
  const stmtY = useTransform(stmtScroll, [0, 1], ['10%', '-10%']);

  return (
    <div>
      {/* ================================================================
          SECTION 1: HERO — immersive full-viewport typographic entrance
          ================================================================ */}
      <section
        ref={heroRef}
        style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}
      >
        {/* Layered gradient background */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 70% 50% at 50% 45%, var(--hero-gradient-blue) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 70%, var(--hero-gradient-green) 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 15% 30%, var(--hero-gradient-blue) 0%, transparent 50%)',
            y: heroY,
            scale: heroScale,
          }}
        />

        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(var(--hero-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid-line) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
          opacity: 0.7,
        }} />

        {/* Accent line — vertical */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, ease: easeOutExpo, delay: 0.6 }}
          style={{
            position: 'absolute',
            left: 'var(--margin)',
            top: '15%',
            bottom: '15%',
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, var(--color-primary), transparent)',
            transformOrigin: 'top',
            opacity: 0.2,
          }}
        />

        {/* Main content — left aligned */}
        <motion.div
          style={{ position: 'relative', zIndex: 2, textAlign: 'left', width: '100%', padding: '0 var(--margin)', opacity: heroOpacity }}
        >
          {/* Top tag */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: easeOutExpo }}
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: 'var(--space-md)' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Artist
            </span>
            <span style={{ width: '50px', height: '1px', background: 'var(--color-primary)', opacity: 0.4 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Producer
            </span>
          </motion.div>

          {/* Name — single line */}
          <div style={{ overflow: 'hidden', paddingBottom: '0.15em' }}>
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-hero)',
                fontSize: 'clamp(3rem, 9.5vw, 13rem)',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.05em',
                color: 'var(--color-text)',
                whiteSpace: 'nowrap',
                paddingBottom: '0.1em',
              }}
            >
              Nojus Pečiukonis
            </motion.h1>
          </div>

          {/* CTA row — centered below name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: easeOutExpo }}
            style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: 'var(--space-lg)', flexWrap: 'wrap' }}
          >
            <CreativeButton
              href="https://open.spotify.com/artist/5DCeuEaJI3qICAOZOQde0I"
              target="_blank"
              rel="noopener noreferrer"
              bg="var(--color-accent)"
              hoverBg="var(--color-text)"
              color="var(--color-accent-text)"
              hoverColor="var(--color-bg)"
              borderColor="var(--color-accent)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              Listen on Spotify
            </CreativeButton>

            <CreativeButton
              href="/music"
              borderColor="var(--color-text-secondary)"
              color="var(--color-text-secondary)"
            >
              Explore Music
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </CreativeButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator — bottom center */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: 'var(--space-md)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-text-muted)' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--color-text-muted), transparent)' }}
          />
        </motion.div>

        {/* Corner accents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            position: 'absolute',
            right: 'var(--margin)',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            writingMode: 'vertical-rl',
            opacity: 0.4,
          }}
        >
          Electronic / Ambient
        </motion.div>
      </section>
      {/* ================================================================
          SECTION 3: FEATURED RELEASES
          ================================================================ */}
      <section style={{ padding: 'var(--space-xl) var(--margin)', background: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {/* Section header — Swiss style */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-lg)', paddingBottom: '1.5rem' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Releases</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.03em' }}>
                Featured Work
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
            </motion.div>
          </div>

          {/* Release cards grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-5% 0px' }}
            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--grid-gap)', maxWidth: '800px' }}
          >
            {RELEASES.map((release, i) => (
              <ReleaseCard key={release.id} release={release} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4: STATEMENT — full width with parallax
          ================================================================ */}
      <section
        ref={stmtRef}
        style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'linear-gradient(135deg, #0024c1, #0033ff)' }}
      >
        {/* Parallax background texture */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '-20%',
            background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(195,244,0,0.08) 0%, transparent 70%)',
            y: stmtY,
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 79px, var(--stmt-line) 79px, var(--stmt-line) 80px)',
        }} />

        {/* Portrait image — right side */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.3 }}
          style={{
            position: 'absolute',
            right: 'var(--margin)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(250px, 30vw, 450px)',
            aspectRatio: '3/4',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <img
            src="/images/statement-photo.png"
            alt="Nojus Pečiukonis"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              mixBlendMode: 'luminosity',
              opacity: 0.55,
            }}
          />
        </motion.div>

        <div style={{ position: 'relative', zIndex: 2, padding: 'var(--space-xl) var(--margin)', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
          <TextReveal
            text=""
            tag="h2"
            delay={0}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              marginBottom: 'var(--space-lg)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: easeOutExpo }}
            style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', alignItems: 'flex-start', maxWidth: '55%' }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', lineHeight: 1.7 }}>
              Nojus Peciukonis crafts sonic worlds that blur the line between the physical and the abstract — electronic compositions built from texture, space, and deliberate silence.
            </p>
            <CreativeButton
              href="/about"
              bg="rgba(255,255,255,0.15)"
              hoverBg="#ffffff"
              color="#ffffff"
              hoverColor="var(--color-primary)"
              borderColor="rgba(255,255,255,0.3)"
            >
              About Me
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </CreativeButton>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5: STATS — Swiss data grid
          ================================================================ */}
      <section style={{ padding: 'var(--space-xl) var(--margin)', background: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem' }}>
            <StatCounter value={5} label="Years Creating Music" suffix="+" />
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6: SPOTIFY EMBED
          ================================================================ */}
      <section style={{ padding: 'var(--space-xl) var(--margin)', background: 'var(--color-bg-alt)' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-primary)', marginBottom: '1rem' }}>
            Stream
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 'var(--space-lg)' }}>
              Listen Now
            </h2>
            <iframe
              style={{ border: 'none', display: 'block' }}
              src="https://open.spotify.com/embed/artist/5DCeuEaJI3qICAOZOQde0I?utm_source=generator&theme=0"
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Nojus Peciukonis on Spotify"
            />
          </motion.div>
        </div>
      </section>
      {/* ================================================================
          SECTION 8: CONTACT CTA
          ================================================================ */}
      <section style={{ padding: 'var(--space-xl) var(--margin)', background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
              
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Let's create something.
            </h2>
          </div>
          <CreativeButton href="/contact">
            Get in touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </CreativeButton>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/** Animated release card with hover interactions */
const ReleaseCard: React.FC<{ release: Release; index: number }> = ({ release }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="https://open.spotify.com/artist/5DCeuEaJI3qICAOZOQde0I"
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        aspectRatio: '1/1',
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Background image */}
      <motion.img
        src="/images/featured-release.png"
        alt={release.title}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
      />

      {/* Dark overlay for text legibility */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            {release.index}
          </span>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.div>
        </div>

        <div>
          <motion.h3
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem', color: '#ffffff' }}
            animate={{ y: hovered ? -4 : 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
          >
            {release.title}
          </motion.h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)' }}>
            {release.genre} · {release.year}
          </p>
        </div>
      </div>

      {/* Hover reveal bottom bar */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--color-accent)',
          transformOrigin: 'left',
          zIndex: 2,
        }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
      />
    </motion.a>
  );
};

export default Home;
