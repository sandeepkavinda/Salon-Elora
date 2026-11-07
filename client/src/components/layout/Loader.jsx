import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, markLoaded, EASE, EASE_IN_OUT } from '../../lib/motion';
import { lockScroll, unlockScroll } from '../../lib/lenis';
import { site } from '../../lib/siteConfig';

const SEEN_KEY = 'elora-intro-seen';

/**
 * Brand intro: ivory → wordmark → gold line expands → tagline → cinematic lift.
 * Roughly 2.6s. Shown once per browser session; skipped entirely for reduced motion.
 */
export default function Loader() {
  const root = useRef(null);
  const [done, setDone] = useState(() => {
    try {
      return sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
      return false;
    }
  });
  const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useLayoutEffect(() => {
    if (done) {
      markLoaded();
      return undefined;
    }
    if (calm) {
      setDone(true);
      return undefined;
    }

    lockScroll();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: EASE },
        onComplete: () => {
          try {
            sessionStorage.setItem(SEEN_KEY, '1');
          } catch {
            /* ignore */
          }
          unlockScroll();
          setDone(true);
        },
      });

      tl.from('[data-loader-word]', { opacity: 0, y: 18, duration: 1, stagger: 0.12 })
        .from('[data-loader-line]', { scaleX: 0, duration: 1, ease: EASE_IN_OUT }, '-=0.45')
        .from('[data-loader-tag]', { yPercent: 110, duration: 0.9 }, '-=0.5')
        .to({}, { duration: 0.35 })
        .add(() => markLoaded(), '>-0.1')
        .to('[data-loader-content]', { opacity: 0, y: -14, duration: 0.5, ease: 'power2.in' }, '<')
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.15, ease: EASE_IN_OUT }, '<0.15');
    }, root);

    return () => {
      ctx.revert();
      unlockScroll();
    };
  }, [done, calm]);

  if (done) return null;

  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading Salon Elora"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div data-loader-content className="flex flex-col items-center px-6 text-center text-espresso">
        <div className="flex items-baseline gap-[0.45em] font-serif text-[clamp(2.2rem,7vw,4.5rem)] font-light tracking-[0.3em]">
          <span data-loader-word>SALON</span>
          <span data-loader-word className="italic">ELORA</span>
        </div>
        <div data-loader-line className="gold-line my-6 h-px w-[min(60vw,260px)]" />
        <div className="overflow-hidden">
          <p data-loader-tag className="label text-espresso/70">
            {site.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
