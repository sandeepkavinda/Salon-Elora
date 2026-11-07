import { useLayoutEffect, useRef } from 'react';
import { gsap, SplitText, loaded, isLoaded, EASE, EASE_IN_OUT } from '../../lib/motion';
import SmartImage from '../ui/SmartImage';
import Button from '../ui/Button';
import { PHOTO } from '../../lib/images';

/**
 * Cinematic hero. Choreography (starts once the intro lifts):
 * image mask opens → image settles from zoom → headline words rise → copy fades up →
 * buttons stagger → scroll cue appears. On scroll the photograph drifts slower than the page.
 */
export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root.current);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const split = SplitText.create('[data-hero-title]', {
        type: 'lines,words',
        mask: 'lines',
        linesClass: 'split-mask',
      });

      const tl = gsap.timeline({ paused: true, defaults: { ease: EASE } });
      tl.fromTo('[data-hero-media]', { clipPath: 'inset(12% 12% 12% 12%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.9, ease: EASE_IN_OUT }, 0)
        .from('[data-hero-zoom]', { scale: 1.3, duration: 2.6 }, 0)
        .from('[data-hero-eyebrow]', { opacity: 0, y: 16, duration: 1 }, 0.9)
        .from(split.words, { yPercent: 115, duration: 1.4, stagger: 0.12 }, 1)
        .from('[data-hero-copy]', { opacity: 0, y: 24, duration: 1.1 }, 1.7)
        .from('[data-hero-btn]', { opacity: 0, y: 24, duration: 1, stagger: 0.12 }, 1.9)
        .from('[data-hero-side]', { opacity: 0, duration: 1.2 }, 2.2)
        .from('[data-hero-frame]', { opacity: 0, scale: 0.94, duration: 1.6 }, 1.5)
        .from('[data-hero-cue]', { opacity: 0, y: 12, duration: 1 }, 2.4);

      if (isLoaded()) tl.delay(0.55).play();
      else loaded.then(() => tl.play());

      // Parallax: photograph drifts, text lifts away, frame moves against the image.
      gsap.to('[data-hero-parallax]', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('[data-hero-text]', {
        yPercent: -14,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '70% top', scrub: true },
      });
      gsap.to('[data-hero-frame]', {
        yPercent: -9,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      // Gentle idle drift on the decorative frame.
      gsap.to('[data-hero-frame-inner]', { y: -10, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });

      return () => split.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} aria-label="Introduction" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-espresso">
      <div data-hero-media className="absolute inset-0">
        <div data-hero-zoom className="absolute inset-0">
          <div data-hero-parallax className="absolute inset-x-0 -top-[8%] -bottom-[8%]">
            <SmartImage
              id={PHOTO.hero}
              alt="Woman with long, softly waved hair styled at Salon Elora"
              sizes="100vw"
              priority
              className="h-full w-full"
              position="center 30%"
            />
          </div>
        </div>
        {/* Warm scrim keeps type legible on any photograph */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/25 to-espresso/35" />
      </div>

      {/* Decorative hairline frame */}
      <div data-hero-frame aria-hidden="true" className="pointer-events-none absolute inset-x-[5vw] inset-y-[11vh] hidden md:block">
        {/* open at the bottom so it never cuts through the copy and buttons */}
        <div data-hero-frame-inner className="h-full w-full border-x border-t border-gold/35" />
      </div>

      <div data-hero-text className="wrap relative z-10 flex h-full flex-col justify-end pb-[clamp(5.5rem,12vh,8rem)] text-ivory">
        <p data-hero-eyebrow className="label mb-5 text-champagne md:mb-7">
          Salon Elora &nbsp;·&nbsp; Luxury Hair &amp; Beauty
        </p>
        <h1 data-hero-title className="display display-xl max-w-[11ch] md:max-w-[12ch]">
          Discover <em>Your</em> Beauty.
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p data-hero-copy className="max-w-md text-base leading-relaxed text-ivory/85 md:text-lg">
            A sanctuary for hair, skin and style in Sri Lanka, where every detail is considered and every look is made for you.
          </p>
          <div className="flex flex-wrap gap-3">
            <span data-hero-btn className="block w-full sm:inline-block sm:w-auto">
              <Button to="/services" variant="light" className="w-full sm:w-auto">
                Explore Our Services
              </Button>
            </span>
            <span data-hero-btn className="block w-full sm:inline-block sm:w-auto">
              <Button to="/contact" variant="outline" className="w-full text-ivory sm:w-auto">
                Contact Us
              </Button>
            </span>
          </div>
        </div>
      </div>

      <p data-hero-side className="label absolute right-[2.2vw] top-1/2 z-10 hidden -translate-y-1/2 rotate-90 text-ivory/70 lg:block">
        Beauty · Elegance · You
      </p>

      <div data-hero-cue aria-hidden="true" className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory md:flex">
        <span className="label !text-[0.6rem] text-ivory/70">Scroll</span>
        <span className="scroll-cue relative block h-12 w-px overflow-hidden bg-ivory/25" />
      </div>
    </section>
  );
}
