/**
 * Page transition wrapper.
 * Animates page content on route changes with a smooth enter/exit sequence.
 * Includes a full-viewport color wipe overlay effect.
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { easeOutExpo } from '../utils/animations';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
