import { Instagram } from 'lucide-react';
import SmartImage from '../ui/SmartImage';
import { TextLink } from '../ui/Button';
import { instagramTiles } from '../../lib/content';
import { site } from '../../lib/siteConfig';

export default function InstagramSection() {
  return (
    <section className="section pb-0">
      <div className="wrap">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p data-fade className="label mb-6 text-gold">
              Follow along
            </p>
            <h2 data-split className="display display-md">
              {site.social.handle}
            </h2>
          </div>
          <div data-fade>
            <TextLink href={site.social.instagram} external>
              Follow on Instagram
            </TextLink>
          </div>
        </div>
      </div>

      <div data-fade-group className="grid grid-cols-2 gap-px bg-ivory md:grid-cols-3 lg:grid-cols-6">
        {instagramTiles.map((id, idx) => (
          <a
            key={id + idx}
            data-fade-item
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on Instagram"
            className="group relative block overflow-hidden"
          >
            <SmartImage id={id} alt="" sizes="(min-width:1024px) 17vw, 50vw" zoomOnHover className="aspect-square w-full" />
            <span className="absolute inset-0 flex items-center justify-center bg-espresso/0 text-ivory opacity-0 transition-[opacity,background-color] duration-700 group-hover:bg-espresso/40 group-hover:opacity-100">
              <Instagram strokeWidth={1.2} size={30} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
