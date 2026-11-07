import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { nav, site, whatsappLink } from '../../lib/siteConfig';

const socials = [
  { label: 'Instagram', href: site.social.instagram, Icon: Instagram },
  { label: 'Facebook', href: site.social.facebook, Icon: Facebook },
  { label: 'WhatsApp', href: whatsappLink(), Icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso text-ivory">
      <div className="wrap pt-24 md:pt-36">
        {/* Animated CTA */}
        <Link to="/contact" data-cursor className="group block">
          <p className="label mb-6 text-gold" data-fade>
            Get in touch
          </p>
          <div className="flex items-end justify-between gap-6">
            <h2 data-split className="display display-lg max-w-[14ch]">
              Let’s talk <em>beauty.</em>
            </h2>
            <span
              data-fade="0.2"
              className="mb-2 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-ivory/40 transition-[background-color,border-color,transform] duration-700 ease-[var(--ease-expo)] group-hover:scale-110 group-hover:border-gold group-hover:bg-gold md:h-32 md:w-32"
            >
              <ArrowUpRight
                strokeWidth={1}
                className="h-8 w-8 transition-[transform,color] duration-700 ease-[var(--ease-expo)] group-hover:rotate-45 group-hover:text-espresso md:h-12 md:w-12"
              />
            </span>
          </div>
        </Link>

        <div data-line className="gold-line mt-16 md:mt-24" />

        {/* Info */}
        <div data-fade-group className="grid gap-12 py-14 md:grid-cols-12 md:py-20">
          <div data-fade-item className="md:col-span-4">
            <p className="font-serif text-3xl font-light italic leading-snug text-ivory/90">{site.tagline}</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/60">
              A luxury hair and beauty salon in Sri Lanka.
            </p>
          </div>

          <nav aria-label="Footer" data-fade-item className="md:col-span-2 md:col-start-6">
            <p className="label mb-5 text-gold">Explore</p>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-underline text-ivory/80 transition-colors hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-fade-item className="md:col-span-3">
            <p className="label mb-5 text-gold">Visit & contact</p>
            <address className="space-y-2.5 text-ivory/80 not-italic">
              {site.contact.addressLines.map((l) => (
                <p key={l}>{l}</p>
              ))}
              <p>
                <a href={`tel:${site.contact.phoneHref}`} className="link-underline">
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.contact.email}`} className="link-underline break-all">
                  {site.contact.email}
                </a>
              </p>
            </address>
          </div>

          <div data-fade-item className="md:col-span-2">
            <p className="label mb-5 text-gold">Follow</p>
            <ul className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex h-12 w-12 items-center justify-center border border-ivory/25 transition-[background-color,border-color,transform] duration-700 ease-[var(--ease-expo)] hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-espresso"
                  >
                    <Icon size={18} strokeWidth={1.4} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Giant wordmark */}
        <div aria-hidden="true" className="select-none overflow-hidden">
          <p
            data-split="words"
            className="display whitespace-nowrap text-center text-[15.5vw] leading-[0.82] tracking-[0.02em] text-ivory/95"
          >
            SALON <em>ELORA</em>
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-ivory/15 py-7 text-xs text-ivory/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Salon Elora. All rights reserved.</p>
          <p className="label !text-[0.65rem]">Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
