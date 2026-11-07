import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Instagram, Facebook, MessageCircle, Phone, Mail, MapPin, Clock, LoaderCircle } from 'lucide-react';
import Page from '../components/layout/Page';
import PageHeader from '../components/sections/PageHeader';
import { site, whatsappLink } from '../lib/siteConfig';
import { PHOTO } from '../lib/images';
import { FM_EASE } from '../lib/motion';
import { getLenis } from '../lib/lenis';

const API = `${import.meta.env.VITE_API_URL || ''}/api/contact`;

const fields = [
  { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel' },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off' },
];

/** Mirrors the server rules so users get instant feedback; the server remains the authority. */
function validate(v) {
  const e = {};
  if (v.name.trim().length < 2 || v.name.trim().length > 80) e.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()) || v.email.length > 120) e.email = 'Please enter a valid email address.';
  if (!/^[+()\d][\d\s()+-]{6,19}$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (v.subject.trim().length < 3 || v.subject.trim().length > 120) e.subject = 'Please add a short subject.';
  if (v.message.trim().length < 10 || v.message.trim().length > 2000) e.message = 'Please write a message of at least 10 characters.';
  return e;
}

const empty = { name: '', email: '', phone: '', subject: '', message: '' };

function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverMsg, setServerMsg] = useState('');
  const honeypot = useRef(null);
  const openedAt = useRef(Date.now());
  const wrapRef = useRef(null);

  // Bring the confirmation into view once the form has been replaced by it.
  useEffect(() => {
    if (status !== 'success' || !wrapRef.current) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(wrapRef.current, { offset: -140, duration: 1.2 });
    else wrapRef.current.scrollIntoView({ block: 'center' });
  }, [status]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.querySelector('[data-invalid="true"] input, [data-invalid="true"] textarea')?.focus();
      return;
    }
    setStatus('sending');
    setServerMsg('');
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          website: honeypot.current?.value || '',
          elapsed: Date.now() - openedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
      setStatus('success');
      setValues(empty);
    } catch (err) {
      setServerMsg(err.message === 'Failed to fetch' ? 'We could not reach the server. Please try again in a moment, or contact us by phone or WhatsApp.' : err.message);
      setStatus('error');
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: FM_EASE }}
            className="flex min-h-[28rem] flex-col items-start justify-center border border-gold/50 p-8 md:p-14"
          >
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <motion.circle
                cx="28" cy="28" r="26" stroke="#C5A46D" strokeWidth="1"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: FM_EASE }}
              />
              <motion.path
                d="M17 29l8 8 14-17" stroke="#C5A46D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: FM_EASE, delay: 0.5 }}
              />
            </svg>
            <h2 className="display display-md mt-8">
              Thank you. <em>We have your message.</em>
            </h2>
            <p className="lead mt-5 max-w-md">
              A confirmation is on its way to your inbox, and we will reply personally as soon as we can.
            </p>
            <button
              type="button"
              onClick={() => { setStatus('idle'); openedAt.current = Date.now(); }}
              className="label link-underline mt-10"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            aria-describedby={status === 'error' ? 'form-error' : undefined}
          >
            <div className="grid gap-x-10 gap-y-3 md:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className="field" data-invalid={Boolean(errors[f.name])}>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    placeholder=" "
                    value={values[f.name]}
                    onChange={onChange}
                    aria-invalid={Boolean(errors[f.name])}
                    aria-describedby={errors[f.name] ? `${f.name}-err` : undefined}
                    required
                  />
                  <label htmlFor={f.name}>{f.label}</label>
                  <p id={`${f.name}-err`} className="min-h-5 pt-1 text-xs text-[#9c4a3c]">
                    {errors[f.name]}
                  </p>
                </div>
              ))}
              <div className="field md:col-span-2" data-invalid={Boolean(errors.message)}>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder=" "
                  value={values.message}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-err' : undefined}
                  required
                />
                <label htmlFor="message">Your message</label>
                <p id="message-err" className="min-h-5 pt-1 text-xs text-[#9c4a3c]">
                  {errors.message}
                </p>
              </div>
            </div>

            {/* Honeypot: invisible to people, tempting to bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {status === 'error' && (
              <p id="form-error" role="alert" className="mt-4 border-l border-[#9c4a3c] pl-4 text-sm text-[#9c4a3c]">
                {serverMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group relative mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 overflow-hidden bg-espresso px-10 py-4 text-ivory label disabled:opacity-70 md:w-auto"
            >
              <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100" />
              <span className="relative z-10 flex items-center gap-3 transition-colors duration-700 group-hover:text-espresso">
                {status === 'sending' ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" /> Sending
                  </>
                ) : (
                  'Send message'
                )}
              </span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const info = [
  { Icon: Phone, label: 'Call', node: <a href={`tel:${site.contact.phoneHref}`} className="link-underline">{site.contact.phone}</a> },
  { Icon: MessageCircle, label: 'WhatsApp', node: <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-underline">Chat with us</a> },
  { Icon: Mail, label: 'Email', node: <a href={`mailto:${site.contact.email}`} className="link-underline break-all">{site.contact.email}</a> },
  {
    Icon: MapPin,
    label: 'Visit',
    node: <address className="not-italic">{site.contact.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>,
  },
  {
    Icon: Clock,
    label: 'Opening hours',
    node: (
      <dl className="space-y-1">
        {site.hours.map(([d, h]) => (
          <div key={d} className="flex justify-between gap-6">
            <dt className="text-espresso/70">{d}</dt>
            <dd className="tabular-nums">{h}</dd>
          </div>
        ))}
      </dl>
    ),
  },
];

export default function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}&output=embed`;

  return (
    <Page
      title="Contact"
      image={PHOTO.interiorA}
      description="Contact Salon Elora in Sri Lanka by form, phone, email or WhatsApp. Find our address and opening hours."
    >
      <PageHeader
        eyebrow="Contact us"
        title={
          <>
            Let’s <em>begin</em> with hello.
          </>
        }
        intro="Questions about a service, a bridal enquiry, or simply curious? Send us a message and we will reply personally."
      />

      <section className="pb-24 md:pb-40">
        <div className="wrap grid gap-16 md:grid-cols-12 md:gap-10">
          <div data-fade-group className="md:col-span-4">
            <ul className="space-y-0">
              {info.map(({ Icon, label, node }) => (
                <li key={label} data-fade-item className="grid grid-cols-[2rem_1fr] gap-4 border-t border-espresso/15 py-6 first:border-t-0 first:pt-0">
                  <Icon size={18} strokeWidth={1.3} className="mt-1 text-gold" aria-hidden="true" />
                  <div>
                    <p className="label mb-2 !text-[0.65rem] text-espresso/60">{label}</p>
                    <div className="leading-relaxed">{node}</div>
                  </div>
                </li>
              ))}
              <li data-fade-item className="border-t border-espresso/15 pt-6">
                <p className="label mb-4 !text-[0.65rem] text-espresso/60">Follow</p>
                <div className="flex gap-3">
                  {[
                    { label: 'Instagram', href: site.social.instagram, Icon: Instagram },
                    { label: 'Facebook', href: site.social.facebook, Icon: Facebook },
                  ].map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-12 w-12 items-center justify-center border border-espresso/25 transition-[background-color,border-color,transform] duration-700 ease-[var(--ease-expo)] hover:-translate-y-1 hover:border-gold hover:bg-gold"
                    >
                      <Icon size={18} strokeWidth={1.4} />
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          <div data-fade className="md:col-span-7 md:col-start-6">
            <ContactForm />
          </div>
        </div>
      </section>

      <section aria-label="Map" className="pb-0">
        <div data-fade className="relative h-[55svh] min-h-[320px] w-full">
          <iframe
            title="Salon Elora location map"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-frame absolute inset-0 h-full w-full border-0"
          />
        </div>
      </section>
    </Page>
  );
}
