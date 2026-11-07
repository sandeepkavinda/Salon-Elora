import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Shared animation language: one primary ease, one transition ease, a small duration scale. */
export const EASE = 'expo.out';
export const EASE_IN_OUT = 'expo.inOut';
export const DUR = { fast: 0.7, base: 1.1, slow: 1.6 };
/** Same curve for Framer Motion (cubic-bezier equivalent of expo.out). */
export const FM_EASE = [0.16, 1, 0.3, 1];

/* ---------- Intro / page readiness ---------- */

let resolveLoaded;
export const loaded = new Promise((resolve) => {
  resolveLoaded = resolve;
});
let loadedFlag = false;
export const isLoaded = () => loadedFlag;
export const markLoaded = () => {
  if (loadedFlag) return;
  loadedFlag = true;
  document.documentElement.dataset.loaded = 'true';
  resolveLoaded();
};

/** Delay before page content animates in, to let the route curtain clear first. */
const CURTAIN_DELAY = 0.55;

/**
 * gsap.from() that fires when the target scrolls into view, or – if it is already on screen –
 * right after the intro / page curtain has finished. Always runs inside a gsap context.
 */
export function revealFrom(targets, vars, triggerEl) {
  const list = gsap.utils.toArray(targets);
  const probe = triggerEl || list[0];
  if (!probe) return null;

  const visibleNow = ScrollTrigger.isInViewport(probe, 0.12);
  if (visibleNow) {
    const ready = isLoaded();
    const tween = gsap.from(list, {
      ...vars,
      delay: (vars.delay || 0) + (ready ? CURTAIN_DELAY : 0.1),
      paused: !ready,
    });
    if (!ready) loaded.then(() => tween.play());
    return tween;
  }
  return gsap.from(list, {
    ...vars,
    scrollTrigger: { trigger: probe, start: 'top 88%', once: true },
  });
}

/** Split a heading into masked lines and reveal them. */
export function splitReveal(el, { stagger = 0.11, duration = DUR.base, by = 'lines' } = {}) {
  return SplitText.create(el, {
    type: 'lines,words',
    mask: 'lines',
    linesClass: 'split-mask',
    autoSplit: true,
    onSplit(self) {
      return revealFrom(by === 'words' ? self.words : self.lines, {
        yPercent: 112,
        duration,
        ease: EASE,
        stagger,
      }, el);
    },
  });
}

export { gsap, ScrollTrigger, SplitText };
