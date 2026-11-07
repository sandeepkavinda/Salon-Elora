import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../../lib/motion';
import { setLenis } from '../../lib/lenis';

/** Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll() {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95, smoothWheel: true });
    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
