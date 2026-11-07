import { Link } from 'react-router-dom';
import SmartImage from '../ui/SmartImage';
import { TextLink } from '../ui/Button';
import { PHOTO } from '../../lib/images';

const tiles = [
  { id: PHOTO.colouring, alt: 'Dimensional hair colour', cls: 'md:col-span-5 md:row-span-2', ratio: 'aspect-[4/5] md:aspect-auto md:h-full', label: 'Hair' },
  { id: PHOTO.bridalB, alt: 'Bridal beauty', cls: 'md:col-span-4 md:col-start-7 md:mt-24', ratio: 'aspect-[3/4]', label: 'Bridal' },
  { id: PHOTO.beautyA, alt: 'Beauty and makeup', cls: 'md:col-span-3 md:col-start-10', ratio: 'aspect-[3/4]', label: 'Beauty' },
  { id: PHOTO.interiorC, alt: 'Salon interior', cls: 'md:col-span-4 md:col-start-7', ratio: 'aspect-[4/3]', label: 'Salon' },
  { id: PHOTO.nails, alt: 'Nail care', cls: 'md:col-span-3 md:col-start-11 md:-mt-12', ratio: 'aspect-square', label: 'Nails' },
];

export default function PortfolioPreview() {
  return (
    <section className="section overflow-hidden">
      <div className="wrap">
        <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <div>
            <p data-fade className="label mb-6 text-gold">
              Portfolio
            </p>
            <h2 data-split className="display display-lg">
              Beauty, <em>in focus.</em>
            </h2>
          </div>
          <div data-fade>
            <TextLink to="/gallery">Explore the gallery</TextLink>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-12 md:gap-6">
          {tiles.map((t) => (
            <Link key={t.id + t.label} to="/gallery" data-cursor className={`group relative block ${t.cls}`}>
              <div data-img-reveal className="h-full">
                <SmartImage
                  id={t.id}
                  alt={t.alt}
                  sizes="(min-width:768px) 40vw, 100vw"
                  zoomOnHover
                  className={`w-full ${t.ratio}`}
                />
                <div className="absolute inset-0 flex items-end bg-espresso/0 p-5 transition-colors duration-700 group-hover:bg-espresso/25">
                  <span className="label translate-y-3 text-ivory opacity-0 transition-[opacity,transform] duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0 group-hover:opacity-100">
                    {t.label}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
