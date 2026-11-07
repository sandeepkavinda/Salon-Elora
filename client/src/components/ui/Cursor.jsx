import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/motion';

/**
 * A single quiet gold ring that trails the pointer and softly grows over interactive elements.
 * Desktop with a fine pointer only; disabled for reduced motion. The native cursor is kept.
 */
export default function Cursor() {
  const ring = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return undefined;

    const el = ring.current;
    const ctx = gsap.context(() => {
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
      const x = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3' });
      const y = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3' });
      let shown = false;

      const move = (e) => {
        x(e.clientX);
        y(e.clientY);
        if (!shown) {
          shown = true;
          gsap.to(el, { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' });
        }
      };
      const over = (e) => {
        const t = e.target.closest?.('a, button, [data-cursor]');
        gsap.to(el, {
          scale: t ? 1.9 : 1,
          backgroundColor: t ? 'rgba(197,164,109,0.18)' : 'rgba(197,164,109,0)',
          duration: 0.5,
          ease: 'expo.out',
          overwrite: 'auto',
        });
      };
      const leave = () => {
        shown = false;
        gsap.to(el, { opacity: 0, scale: 0, duration: 0.4 });
      };

      window.addEventListener('pointermove', move, { passive: true });
      window.addEventListener('pointerover', over, { passive: true });
      document.documentElement.addEventListener('pointerleave', leave);
      return () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerover', over);
        document.documentElement.removeEventListener('pointerleave', leave);
      };
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-10 w-10 rounded-full border border-gold md:block"
    />
  );
}
