import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import Page from '../components/layout/Page';
import PageHeader from '../components/sections/PageHeader';
import SmartImage from '../components/ui/SmartImage';
import Lightbox from '../components/ui/Lightbox';
import { galleryCategories, galleryItems } from '../lib/content';
import { gsap, revealFrom, EASE, EASE_IN_OUT } from '../lib/motion';
import { PHOTO } from '../lib/images';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);
  const grid = useRef(null);

  const items = useMemo(
    () => (filter === 'All' ? galleryItems : galleryItems.filter((g) => g.cats.includes(filter))),
    [filter],
  );

  // Progressive reveal; re-runs whenever the filter changes the set of images.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(grid.current);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('[data-gallery-item]').forEach((el, i) => {
        revealFrom(el, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3, ease: EASE_IN_OUT, delay: (i % 3) * 0.1 });
        const scale = el.querySelector('[data-scale-layer]');
        if (scale) revealFrom(scale, { scale: 1.3, duration: 1.8, ease: EASE, delay: (i % 3) * 0.1 }, el);
      });
    });
    return () => mm.revert();
  }, [filter]);

  return (
    <Page
      title="Gallery"
      image={PHOTO.bridal}
      description="A selection of hair, beauty, bridal, transformation and interior photography from Salon Elora, Sri Lanka."
    >
      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            A portfolio of <em>moments.</em>
          </>
        }
        intro="A look at the work and the space. Choose a category, then open any image to view it full size."
      />

      <section className="pb-28 md:pb-44">
        <div className="wrap">
          <div role="tablist" aria-label="Gallery categories" className="mb-12 flex flex-wrap gap-x-8 gap-y-3 md:mb-16">
            {galleryCategories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className="group relative min-h-11 py-2 label"
              >
                <span className={filter === c ? 'opacity-100' : 'opacity-55 transition-opacity group-hover:opacity-100'}>{c}</span>
                <span
                  className={`absolute inset-x-0 bottom-1 h-px origin-left bg-gold transition-transform duration-700 ease-[var(--ease-expo)] ${
                    filter === c ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
          </div>

          <div ref={grid} key={filter} className="columns-2 gap-3 md:columns-3 md:gap-6">
            {items.map((g, i) => (
              <button
                key={g.id}
                type="button"
                data-gallery-item
                data-cursor
                onClick={() => setOpen(i)}
                aria-label={`Open image: ${g.alt}`}
                className="group relative mb-3 block w-full break-inside-avoid overflow-hidden text-left md:mb-6"
              >
                <SmartImage
                  id={g.src}
                  alt={g.alt}
                  sizes="(min-width:768px) 33vw, 50vw"
                  zoomOnHover
                  className={`w-full ${g.ratio}`}
                />
                <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-espresso/55 via-transparent to-transparent p-4 text-ivory opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <span className="label !text-[0.65rem]">{g.cats[0]}</span>
                  <Maximize2 size={16} strokeWidth={1.4} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open !== null && <Lightbox key="lightbox" items={items} start={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </Page>
  );
}
