import { useRef } from 'react';
import { motion } from 'framer-motion';
import Seo from '../ui/Seo';
import Footer from './Footer';
import usePageAnimations from '../../hooks/usePageAnimations';
import { FM_EASE } from '../../lib/motion';

/**
 * Wraps every route: SEO, scroll choreography, footer and the shared curtain transition.
 * The curtain rises to cover the old page (exit) and lifts off the new one (enter),
 * always travelling upward, with identical timing on all five pages.
 */
export default function Page({ title, description, image, children }) {
  const root = useRef(null);
  usePageAnimations(root);

  return (
    <>
      <Seo title={title} description={description} image={image} />
      <div ref={root}>
        <main id="main">{children}</main>
        <Footer />
      </div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center bg-espresso"
        initial={{ clipPath: 'inset(0 0 0% 0)' }}
        animate={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 1, ease: FM_EASE, delay: 0.05 } }}
        exit={{
          clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
          transition: { duration: 0.85, ease: FM_EASE },
        }}
      >
        <span className="font-serif text-2xl font-light italic tracking-[0.3em] text-gold/80">ELORA</span>
      </motion.div>
    </>
  );
}
