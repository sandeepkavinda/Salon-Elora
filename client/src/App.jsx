import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/layout/Loader';
import Navbar from './components/layout/Navbar';
import SmoothScroll from './components/layout/SmoothScroll';
import Cursor from './components/ui/Cursor';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

// Gallery (lightbox + filtering) is the heaviest inner page, so it loads on demand.
const Gallery = lazy(() => import('./pages/Gallery'));

export default function App() {
  const location = useLocation();

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[130] -translate-y-24 bg-espresso px-4 py-3 text-ivory focus:translate-y-0"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <Cursor />
      <Loader />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Suspense fallback={null} key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}
