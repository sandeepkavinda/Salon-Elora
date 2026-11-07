import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Instagram, Facebook } from 'lucide-react';
import { nav, site } from '../../lib/siteConfig';
import { FM_EASE } from '../../lib/motion';
import { lockScroll, unlockScroll } from '../../lib/lenis';

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  // Transparent over the home hero; solid once scrolled; tucks away while reading down.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 520 && y > last.current + 6) setHidden(true);
      else if (y < last.current - 6 || y < 520) setHidden(false);
      last.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) lockScroll();
    else unlockScroll();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      unlockScroll();
    };
  }, [open]);

  const overHero = pathname === '/' && !scrolled && !open;
  const tone = overHero ? 'text-ivory' : 'text-espresso';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-[transform,background-color,box-shadow] duration-700 ease-[var(--ease-expo)] ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled && !open ? 'bg-ivory shadow-[0_1px_0_rgba(48,40,32,0.08)]' : 'bg-transparent'}`}
      >
        <div
          className={`wrap flex items-center justify-between transition-[padding,color] duration-700 ease-[var(--ease-expo)] ${tone} ${
            scrolled ? 'py-3.5' : 'py-6'
          }`}
        >
          <Link to="/" aria-label="Salon Elora – home" className="group flex flex-col items-start leading-none">
            <span className="label !text-[0.6rem] !tracking-[0.5em] opacity-80">SALON</span>
            <span className="mt-1 font-serif text-[1.7rem] font-light tracking-[0.34em] transition-[letter-spacing] duration-700 ease-[var(--ease-expo)] group-hover:tracking-[0.44em]">
              ELORA
            </span>
            <span className="mt-1.5 h-px w-4 bg-gold transition-[width] duration-700 ease-[var(--ease-expo)] group-hover:w-full" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className="group relative py-2 label">
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-transform duration-700 ease-[var(--ease-expo)] ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-3 flex h-12 w-12 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-7">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-700 ease-[var(--ease-expo)] ${
                  open ? 'top-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-px bg-current transition-all duration-700 ease-[var(--ease-expo)] ${
                  open ? 'top-1/2 w-full -rotate-45' : 'bottom-0 w-4/5'
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.9, ease: FM_EASE }}
            className="fixed inset-0 z-[70] flex flex-col justify-between overflow-y-auto bg-ivory px-6 pb-8 pt-28 text-espresso md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <li key={item.to} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.9, ease: FM_EASE, delay: 0.15 + i * 0.07 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `flex items-baseline gap-4 py-1.5 font-serif text-[clamp(2.6rem,12vw,4rem)] font-light leading-tight ${
                          isActive ? 'italic' : ''
                        }`
                      }
                    >
                      <span className="label !text-[0.65rem] text-gold">0{i + 1}</span>
                      {item.label}
                    </NavLink>
                  </motion.div>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: FM_EASE, delay: 0.55 }}
              className="mt-12 space-y-5 border-t border-espresso/15 pt-6"
            >
              <a href={`tel:${site.contact.phoneHref}`} className="block text-lg">
                {site.contact.phone}
              </a>
              <a href={`mailto:${site.contact.email}`} className="block text-espresso/70">
                {site.contact.email}
              </a>
              <div className="flex gap-3 pt-1">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center border border-espresso/25"
                >
                  <Instagram size={18} strokeWidth={1.4} />
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center border border-espresso/25"
                >
                  <Facebook size={18} strokeWidth={1.4} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
