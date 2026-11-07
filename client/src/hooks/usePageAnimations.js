import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger, SplitText, splitReveal, revealFrom, EASE, EASE_IN_OUT, DUR } from '../lib/motion';
import { scrollToTop } from '../lib/lenis';

/**
 * Declarative scroll choreography for a whole page. Markup opts in with data attributes:
 *
 *  data-split              heading → masked line reveal
 *  data-fade               fade + rise
 *  data-fade-group         children marked data-fade-item stagger in
 *  data-img-reveal         clip-path mask reveal (+ inner [data-scale-layer] settles from zoom)
 *  data-parallax="0.1"     subtle vertical parallax (value = strength, default 0.08)
 *  data-line               gold hairline draws left → right
 *  data-words-scrub        paragraph whose words brighten as you scroll
 *  data-marquee="-25"      large text drifting horizontally with scroll (value = x percent)
 *  data-bg-shift           section fades from ivory to espresso (colours its text to match)
 *
 * Everything runs inside gsap.matchMedia so it is skipped for prefers-reduced-motion
 * and fully reverted on unmount.
 */
export default function usePageAnimations(rootRef, { resetScroll = true } = {}) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (resetScroll) scrollToTop();

    const mm = gsap.matchMedia(root);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = (sel) => gsap.utils.toArray(root.querySelectorAll(sel));

      q('[data-split]').forEach((el) => {
        const opts = {};
        if (el.dataset.split === 'words') opts.by = 'words';
        splitReveal(el, opts);
      });

      q('[data-fade]').forEach((el) => {
        revealFrom(el, { y: 36, opacity: 0, duration: DUR.base, ease: EASE, delay: Number(el.dataset.fade) || 0 });
      });

      q('[data-fade-group]').forEach((group) => {
        const items = gsap.utils.toArray(group.querySelectorAll('[data-fade-item]'));
        if (items.length) {
          revealFrom(items, { y: 40, opacity: 0, duration: DUR.base, ease: EASE, stagger: 0.12 }, group);
        }
      });

      q('[data-img-reveal]').forEach((el) => {
        revealFrom(el, { clipPath: 'inset(100% 0% 0% 0%)', duration: DUR.slow, ease: EASE_IN_OUT });
        const scale = el.querySelector('[data-scale-layer]');
        if (scale) revealFrom(scale, { scale: 1.35, duration: 2, ease: EASE }, el);
      });

      q('[data-parallax]').forEach((el) => {
        const strength = Number(el.dataset.parallax) || 0.08;
        const host = el.parentElement;
        gsap.fromTo(
          el,
          { yPercent: -strength * 100 },
          {
            yPercent: strength * 100,
            ease: 'none',
            scrollTrigger: { trigger: host, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });

      q('[data-line]').forEach((el) => {
        revealFrom(el, { scaleX: 0, duration: DUR.slow, ease: EASE_IN_OUT });
      });

      q('[data-words-scrub]').forEach((el) => {
        const split = SplitText.create(el, { type: 'words' });
        gsap.fromTo(
          split.words,
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.06,
            scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: true },
          },
        );
      });

      q('[data-marquee]').forEach((el) => {
        const to = Number(el.dataset.marquee) || -25;
        gsap.fromTo(
          el,
          { xPercent: 0 },
          {
            xPercent: to,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          },
        );
      });

      q('[data-bg-shift]').forEach((el) => {
        gsap.fromTo(
          el,
          { backgroundColor: '#F8F5EF', color: '#302820' },
          {
            backgroundColor: '#302820',
            color: '#F8F5EF',
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 25%', scrub: true },
          },
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh, { once: true });

    return () => {
      window.removeEventListener('load', refresh);
      mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
