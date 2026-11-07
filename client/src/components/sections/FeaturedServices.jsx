import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SmartImage from '../ui/SmartImage';
import { TextLink } from '../ui/Button';
import { serviceCategories } from '../../lib/content';
import { FM_EASE } from '../../lib/motion';

const featured = serviceCategories.filter((c) => c.featured);

/** Editorial index: oversized service names, with a photograph that follows the active row. */
export default function FeaturedServices() {
  const [active, setActive] = useState(0);

  return (
    <section className="section bg-champagne/40">
      <div className="wrap">
        <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <div>
            <p data-fade className="label mb-6 text-gold">
              Featured services
            </p>
            <h2 data-split className="display display-lg">
              Crafted <em>for you.</em>
            </h2>
          </div>
          <div data-fade>
            <TextLink to="/services">View all services</TextLink>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-12">
          <ul className="md:col-span-7" onMouseLeave={() => setActive(0)}>
            {featured.map((s, i) => (
              <li key={s.id} data-line-wrap className="border-t border-espresso/15 last:border-b">
                <Link
                  to={`/services#${s.id}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-center gap-5 py-6 md:gap-8 md:py-9"
                >
                  <span className="label w-8 text-gold">0{i + 1}</span>
                  <span className="display display-md flex-1 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3 group-hover:italic">
                    {s.name}
                  </span>
                  <span className="relative block h-20 w-16 shrink-0 overflow-hidden md:hidden">
                    <SmartImage id={s.image} alt="" sizes="64px" className="h-full w-full" />
                  </span>
                  <ArrowUpRight
                    strokeWidth={1.2}
                    className="hidden h-8 w-8 shrink-0 opacity-30 transition-[transform,opacity] duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100 md:block"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative hidden md:col-span-5 md:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-champagne">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={featured[active].id}
                    className="absolute inset-0"
                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ clipPath: 'inset(0% 0 0 0)' }}
                    exit={{ opacity: 0.99 }}
                    transition={{ duration: 0.9, ease: FM_EASE }}
                  >
                    <SmartImage
                      id={featured[active].image}
                      alt={featured[active].name}
                      sizes="40vw"
                      className="h-full w-full"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-espresso/70">{featured[active].blurb}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
