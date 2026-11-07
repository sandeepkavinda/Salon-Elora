import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Page from '../components/layout/Page';
import PageHeader from '../components/sections/PageHeader';
import SmartImage from '../components/ui/SmartImage';
import Button from '../components/ui/Button';
import { serviceCategories } from '../lib/content';
import { getLenis } from '../lib/lenis';
import { PHOTO } from '../lib/images';

const ratios = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]'];

export default function Services() {
  const { hash } = useLocation();

  // Deep links from the home page (/services#hair-colouring) scroll once the page has entered.
  useEffect(() => {
    if (!hash) return undefined;
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el, { offset: -70, duration: 1.4 });
      else el.scrollIntoView({ behavior: 'auto' });
    }, 1300);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <Page
      title="Services"
      image={PHOTO.styling}
      description="Hair styling, treatments, colour, haircuts, facials and skincare, makeup, bridal beauty and nail care at Salon Elora, Sri Lanka."
    >
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Every service, <em>considered.</em>
          </>
        }
        intro="Eight areas of care, each delivered with the same attention to detail. Starting prices are shown in LKR; final pricing is confirmed at consultation."
      >
        <nav aria-label="Service categories" data-fade="0.25" className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {serviceCategories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="label link-underline">
              {c.name}
            </a>
          ))}
        </nav>
      </PageHeader>

      {serviceCategories.map((c, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={c.id} id={c.id} className="scroll-mt-20 pb-24 md:pb-40">
            <div className="wrap grid items-start gap-10 md:grid-cols-12 md:gap-8">
              <div className={`md:col-span-5 ${flip ? 'md:order-2 md:col-start-8' : ''}`}>
                <div data-img-reveal className="group">
                  <SmartImage
                    id={c.image}
                    alt={c.name}
                    sizes="(min-width:768px) 42vw, 100vw"
                    parallax
                    className={`w-full ${ratios[i % ratios.length]}`}
                  />
                </div>
              </div>

              <div className={`md:col-span-6 ${flip ? 'md:order-1 md:col-start-1' : 'md:col-start-7'} md:pt-6`}>
                <p data-fade className="label mb-5 text-gold">
                  0{i + 1}
                </p>
                <h2 data-split className="display display-lg">
                  {c.name}
                </h2>
                <p data-fade className="lead mt-6 max-w-lg">
                  {c.blurb}
                </p>

                <ul data-fade-group className="mt-10">
                  {c.items.map((s) => (
                    <li
                      key={s.name}
                      data-fade-item
                      className="group relative grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-t border-espresso/15 py-6 transition-[padding] duration-700 ease-[var(--ease-expo)] last:border-b hover:pl-4"
                    >
                      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100" />
                      <h3 className="display display-sm transition-[font-style] group-hover:italic">{s.name}</h3>
                      <p className="label whitespace-nowrap text-right !text-[0.68rem]">
                        From LKR {s.price}
                      </p>
                      <p className="col-span-2 max-w-md text-sm leading-relaxed text-espresso/70">{s.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section bg-champagne/40 text-center">
        <div className="wrap">
          <h2 data-split className="display display-md mx-auto max-w-[18ch]">
            Not sure where to <em>begin?</em>
          </h2>
          <p data-fade className="lead mx-auto mt-6 max-w-md">
            Tell us what you are after and we will suggest the right service.
          </p>
          <div data-fade className="mt-10">
            <Button to="/contact">Contact us</Button>
          </div>
        </div>
      </section>
    </Page>
  );
}
