import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '../../lib/content';
import { FM_EASE } from '../../lib/motion';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (n) => {
    setDir(n);
    setI((v) => (v + n + testimonials.length) % testimonials.length);
  };
  const t = testimonials[i];

  return (
    <section className="section bg-champagne/40">
      <div className="wrap grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <p data-fade className="label text-gold">
            Kind words
          </p>
        </div>

        <div className="md:col-span-8">
          <div aria-live="polite" className="relative min-h-[18rem] md:min-h-[20rem]">
            <span aria-hidden="true" className="display absolute -left-1 -top-10 text-8xl text-gold/60 md:-left-12 md:text-[9rem]">
              “
            </span>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={i}
                initial={{ opacity: 0, x: 40 * dir }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * dir }}
                transition={{ duration: 0.7, ease: FM_EASE }}
                className="relative pt-8"
              >
                <blockquote className="display display-md">{t.quote}</blockquote>
                <figcaption className="mt-8">
                  <span className="label block">{t.name}</span>
                  <span className="mt-1 block text-sm text-espresso/60">{t.detail}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-espresso/15 pt-6">
            <p className="text-xs text-espresso/55">Placeholder content. Replace with real client reviews before launch.</p>
            <div className="flex items-center gap-3">
              <span className="label mr-3 tabular-nums">
                0{i + 1} / 0{testimonials.length}
              </span>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="group flex h-12 w-12 items-center justify-center border border-espresso/30 transition-colors duration-500 hover:border-gold hover:bg-gold"
              >
                <ArrowLeft size={18} strokeWidth={1.4} className="transition-transform duration-500 group-hover:-translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="group flex h-12 w-12 items-center justify-center border border-espresso/30 transition-colors duration-500 hover:border-gold hover:bg-gold"
              >
                <ArrowRight size={18} strokeWidth={1.4} className="transition-transform duration-500 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
