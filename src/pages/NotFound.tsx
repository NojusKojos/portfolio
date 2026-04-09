import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { easeOutExpo } from '../utils/animations';

const NotFound: React.FC = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--margin)', textAlign: 'center' }}>
    <SEO title="404" description="Page not found" />
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
      style={{ fontFamily: 'var(--font-hero)', fontSize: 'var(--text-3xl)', fontWeight: 400, letterSpacing: '-0.04em', color: 'var(--color-text)' }}
    >
      404
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
      style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}
    >
      This page doesn't exist.
    </motion.p>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
    >
      <Link
        to="/"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--color-primary)',
          borderBottom: '1px solid var(--color-primary)',
          paddingBottom: '0.25rem',
        }}
      >
        Back to Home
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
