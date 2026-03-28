/**
 * Root application component.
 * Sets up routing, global overlays (cursor, scroll progress),
 * and the page transition system.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';

import ScrollProgress from './components/ScrollProgress';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import Music from './pages/Music';
import Contact from './pages/Contact';

/** Inner router content — needed to access useLocation inside Router */
const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <PageTransition>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/music" element={<Music />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageTransition>
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
