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
import CreativeButton from '../components/CreativeButton';
import SEO from '../components/SEO';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          ...formData,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      <SEO
        title="Contact"
        description="Get in touch with Nojus Peciukonis for bookings, collaborations, and press inquiries."
        path="/contact"
      />
      {/* Main content — two column */}
      <section style={{ padding: 'var(--space-xl) var(--margin)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 'var(--space-xl)', alignItems: 'start' }}>
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.2 }}
          >
            {/* Contact details — larger Swiss data style */}
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              {[
                { label: 'Email', value: 'peciukonisnojus@gmail.com' },
                { label: 'Location', value: 'Brussels' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 1rem', alignItems: 'center', background: 'var(--color-bg-alt)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-muted)' }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>{value}</span>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.3 }}
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
                  style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                  {FORM_FIELDS.map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
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
                          padding: '1.25rem 0',
                          background: 'transparent',
                          border: 'none',
                          borderBottom: `${focused === field.id ? '2px' : '1px'} solid ${focused === field.id ? 'var(--color-primary)' : 'var(--color-surface)'}`,
                          color: 'var(--color-text)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '1.15rem',
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

                  {error && (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-red)' }}>
                      Something went wrong. Please try again or email directly.
                    </p>
                  )}

                  <CreativeButton
                    onClick={() => {
                      const form = document.querySelector('form');
                      if (form) form.requestSubmit();
                    }}
                    bg="var(--color-accent)"
                    hoverBg="var(--color-text)"
                    color="var(--color-accent-text)"
                    hoverColor="var(--color-bg)"
                    borderColor="var(--color-accent)"
                    strength={0.2}
                    style={{ padding: '1.5rem 3.5rem', fontSize: '0.9rem', alignSelf: 'flex-start', marginTop: '1rem', opacity: loading ? 0.6 : 1, pointerEvents: loading ? 'none' : 'auto' }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>}
                  </CreativeButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
