import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const base =
  'group relative inline-flex min-h-12 items-center gap-3 overflow-hidden px-7 py-3.5 label transition-colors duration-700 ease-[var(--ease-expo)]';

const variants = {
  /** Espresso fill that is overtaken by a gold wipe on hover */
  solid: {
    wrap: 'bg-espresso text-ivory',
    fill: 'bg-gold',
    text: 'group-hover:text-espresso',
  },
  /** Hairline outline that fills on hover */
  outline: {
    wrap: 'border border-current',
    fill: 'bg-current',
    text: '',
    invert: true,
  },
  light: {
    wrap: 'bg-ivory text-espresso',
    fill: 'bg-gold',
    text: '',
  },
};

export default function Button({ to, href, children, variant = 'solid', className = '', external, ...rest }) {
  const v = variants[variant];
  const content = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100 ${v.fill}`}
      />
      <span className={`relative z-10 flex items-center gap-3 transition-colors duration-700 ${v.text} ${v.invert ? 'mix-blend-normal' : ''}`}>
        {children}
        <ArrowUpRight
          size={16}
          strokeWidth={1.5}
          className="transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </span>
    </>
  );
  const cls = `${base} ${v.wrap} ${className}`;

  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}

/** Understated text link with an animated arrow and underline. */
export function TextLink({ to, href, children, className = '', external }) {
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <ArrowUpRight
        size={16}
        strokeWidth={1.5}
        className="transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </>
  );
  const cls = `group inline-flex items-center gap-2 label ${className}`;
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  );
}
