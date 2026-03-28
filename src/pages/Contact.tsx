/**
 * Contact page — booking, collaboration, and press inquiries.
 *
 * Features:
 * 1. Page hero with animated typography
 * 2. Contact form with animated focus states
 * 3. Direct contact info in Swiss grid layout
 * 4. Social links
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import TextReveal from '../components/TextReveal';
import MagneticButton from '../components/MagneticButton';
import { easeOutExpo } from '../utils/animations';

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

const FORM_FIELDS: FormField[] = [
  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', required: true },
  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Booking / Collaboration / Press', required: true },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ padding: 'var(--space-xl) var(--margin)', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-primary)', marginBottom: '1.5rem' }}
          >
            04 / Contact
          </motion.p>

          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.1 }}
              style={{ fontFamily: 'var(--font-hero)', fontSize: 'var(--text-3xl)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.88, color: 'var(--color-text)' }}
            >
              Let's
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.18 }}
              style={{ fontFamily: 'var(--font-hero)', fontSize: 'var(--text-3xl)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.88, color: 'var(--color-text)' }}
            >
              Connect
            </motion.h1>
          </div>
        </div>
      </section>

      {/* bg shift separator */}

      {/* Main content — two column */}
      <section style={{ padding: 'var(--space-xl) var(--margin)' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-xl)', alignItems: 'start' }}>
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.3 }}
          >
            {/* Contact details — Swiss data style */}
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              {[
                { label: 'Email', value: 'peciukonisnojus@gmail.com' },
                { label: 'Location', value: 'Brussels' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0.75rem', alignItems: 'center', background: 'var(--color-bg-alt)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-muted)' }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Platforms</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { name: 'Spotify', url: 'https://open.spotify.com/artist/5DCeuEaJI3qICAOZOQde0I' },
                { name: 'Instagram', url: '#' },
                { name: 'SoundCloud', url: '#' },
                { name: 'YouTube', url: '#' },
              ].map(({ name, url }) => (
                <MagneticButton key={name} strength={0.2}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.875rem 0',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-secondary)',
                      transition: 'color 0.25s',
                      minWidth: '200px',
                    }}
                  >
                    {name}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
                  </a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                  style={{
                    padding: 'var(--space-xl)',
                    background: 'var(--color-bg-alt)',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    Message sent.
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                    Thank you for reaching out. I'll be in touch within 48 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  {FORM_FIELDS.map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: focused === field.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
                          marginBottom: '0.5rem',
                          transition: 'color 0.25s',
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[field.id] || ''}
                        onChange={e => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        onFocus={() => setFocused(field.id)}
                        onBlur={() => setFocused(null)}
                        style={{
                          width: '100%',
                          padding: '1rem 0',
                          background: 'transparent',
                          border: 'none',
                          borderBottom: `${focused === field.id ? '2px' : '1px'} solid ${focused === field.id ? 'var(--color-primary)' : 'var(--color-surface)'}`,
                          color: 'var(--color-text)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.25s',
                          cursor: 'text',
                        }}
                      />
                    </div>
                  ))}

                  {/* Message textarea */}
                  <div>
                    <label
                      htmlFor="message"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: focused === 'message' ? 'var(--color-accent)' : 'var(--color-text-muted)',
                        marginBottom: '0.5rem',
                        transition: 'color 0.25s',
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      required
                      rows={5}
                      value={formData['message'] || ''}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      style={{
                        width: '100%',
                        padding: '1rem 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: `${focused === 'message' ? '2px' : '1px'} solid ${focused === 'message' ? 'var(--color-primary)' : 'var(--color-surface)'}`,
                        color: 'var(--color-text)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        outline: 'none',
                        resize: 'none',
                        transition: 'border-color 0.25s',
                        cursor: 'text',
                      }}
                    />
                  </div>

                  <MagneticButton strength={0.2} style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                    <button
                      type="submit"
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
                        cursor: 'pointer',
                      }}
                    >
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
                    </button>
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Large typographic CTA at bottom */}
      <section style={{ padding: 'var(--space-xl) var(--margin)', background: 'var(--color-bg-alt)', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <TextReveal
            text="Sound connects everything."
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              color: 'var(--color-text-muted)',
            }}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
