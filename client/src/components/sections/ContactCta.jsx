import { ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';
import { site, whatsappLink } from '../../lib/siteConfig';

const channels = [
  { label: 'Call', value: site.contact.phone, href: `tel:${site.contact.phoneHref}` },
  { label: 'WhatsApp', value: 'Message us', href: whatsappLink(), external: true },
  { label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
];

export default function ContactCta() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="mx-auto max-w-5xl text-center">
          <p data-fade className="label mb-8 text-gold">
            Begin here
          </p>
          <h2 data-split className="display display-lg">
            Ready for your <em>transformation?</em>
          </h2>
          <p data-fade className="lead mx-auto mt-8 max-w-xl">
            Reach out and tell us what you have in mind. We will take it from there.
          </p>
        </div>

        <ul data-fade-group className="mx-auto mt-16 max-w-4xl border-t border-espresso/15">
          {channels.map((c) => (
            <li key={c.label} data-fade-item className="border-b border-espresso/15">
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center justify-between gap-6 py-6 md:py-8"
              >
                <span className="label w-24 shrink-0 text-gold md:w-32">{c.label}</span>
                <span className="display display-sm flex-1 break-all transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2 group-hover:italic">
                  {c.value}
                </span>
                <ArrowUpRight
                  strokeWidth={1.2}
                  className="h-7 w-7 shrink-0 opacity-40 transition-[transform,opacity] duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <div data-fade className="mt-14 text-center">
          <Button to="/contact">Send an enquiry</Button>
        </div>
      </div>
    </section>
  );
}
