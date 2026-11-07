import { useState } from 'react';
import { unsplash, srcSet } from '../../lib/images';

const WIDTHS = [480, 800, 1200, 1800];

/**
 * Responsive, lazy image with a tonal fallback (so a failed URL never leaves a hole).
 *
 * Layers: outer (clip / aspect) > scale layer (GSAP reveal zoom) > parallax layer (GSAP scrub)
 *         > <img> (CSS hover zoom). Each transform lives on its own element so they never fight.
 */
export default function SmartImage({
  id,
  alt,
  sizes = '100vw',
  priority = false,
  parallax = false,
  zoomOnHover = false,
  className = '',
  imgClassName = '',
  position = 'center',
}) {
  const [status, setStatus] = useState('loading');
  const src = unsplash(id, WIDTHS[2]);

  return (
    <div className={`relative overflow-hidden bg-champagne ${className}`}>
      <div data-scale-layer className="absolute inset-0 will-change-transform">
        <div
          {...(parallax ? { 'data-parallax': parallax === true ? '0.07' : String(parallax) } : {})}
          className={`absolute inset-x-0 ${parallax ? '-top-[9%] -bottom-[9%]' : 'inset-y-0'}`}
        >
          {status !== 'error' ? (
            <img
              src={src}
              srcSet={srcSet(id, WIDTHS)}
              sizes={sizes}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              decoding="async"
              onLoad={() => setStatus('ready')}
              onError={() => setStatus('error')}
              style={{ objectPosition: position }}
              className={`h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] ease-[var(--ease-expo)] ${
                status === 'ready' ? 'opacity-100' : 'opacity-0'
              } ${zoomOnHover ? 'group-hover:scale-[1.06]' : ''} ${imgClassName}`}
            />
          ) : (
            <div
              role="img"
              aria-label={alt}
              className="h-full w-full bg-gradient-to-b from-champagne to-taupe/50"
            />
          )}
        </div>
      </div>
    </div>
  );
}
