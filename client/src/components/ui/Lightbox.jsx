import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { unsplash } from '../../lib/images';
import { FM_EASE } from '../../lib/motion';
import { lockScroll, unlockScroll } from '../../lib/lenis';

/**
 * Full-screen viewer. Keyboard (Esc, arrows, Tab trapped), swipe on touch, adjacent images preloaded,
 * smooth directional crossfade between photographs. Focus returns to the opener on close.
 */
export default function Lightbox({ items, start, onClose }) {
  const [index, setIndex] = useState(start);
  const [dir, setDir] = useState(1);
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const total = items.length;
  const item = items[index];

  const go = useCallback(
    (d) => {
      setDir(d);
      setIndex((i) => (i + d + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const opener = document.activeElement;
    lockScroll();
    closeRef.current?.focus();
    return () => {
      unlockScroll();
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        const f = dialogRef.current?.querySelectorAll('button');
        if (!f?.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  useEffect(() => {
    [1, -1].forEach((d) => {
      const n = items[(index + d + total) % total];
      const img = new Image();
      img.src = unsplash(n.src, 1600);
    });
  }, [index, items, total]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[110] flex flex-col bg-espresso/[0.97] text-ivory"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: FM_EASE }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6" onClick={(e) => e.stopPropagation()}>
        <p className="label tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="group flex h-12 w-12 items-center justify-center border border-ivory/30 transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-espresso"
        >
          <X size={20} strokeWidth={1.3} className="transition-transform duration-500 group-hover:rotate-90" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure
            key={item.id}
            className="flex max-h-full max-w-full flex-col items-center"
            initial={{ opacity: 0, x: 60 * dir, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60 * dir }}
            transition={{ duration: 0.6, ease: FM_EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1);
              else if (info.offset.x > 70) go(-1);
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={unsplash(item.src, 1600, 80)}
              alt={item.alt}
              draggable="false"
              className="max-h-[calc(100svh-12rem)] w-auto max-w-full object-contain"
            />
            <figcaption className="mt-5 text-center text-sm text-ivory/70">{item.alt}</figcaption>
          </motion.figure>
        </AnimatePresence>

        <div onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="group absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/30 transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-espresso md:left-8"
          >
            <ArrowLeft size={20} strokeWidth={1.3} className="transition-transform duration-500 group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="group absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/30 transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-espresso md:right-8"
          >
            <ArrowRight size={20} strokeWidth={1.3} className="transition-transform duration-500 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
      <div className="h-6 md:h-10" />
    </motion.div>
  );
}
