import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { mediaFor, type Project } from '../data/projects';
import { useI18n } from '../i18n/context';
import { Warn } from './Icons';

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const accentStyle = (p: Project) =>
  ({ '--accent': p.accent, '--accent-soft': p.accentSoft }) as CSSProperties;

/** Official banner at its native aspect ratio; never cropped. */
export function Banner({
  project,
  sizes = '(min-width: 1100px) 560px, 100vw',
  eager = false,
  className = '',
}: {
  project: Project;
  sizes?: string;
  eager?: boolean;
  className?: string;
}) {
  const { l } = useI18n();
  const m = mediaFor(project.slug).banner;
  return (
    <img
      className={`banner ${className}`}
      src={asset(`media/${project.slug}/banner-960.webp`)}
      srcSet={`${asset(`media/${project.slug}/banner-960.webp`)} 960w, ${asset(`media/${project.slug}/banner.webp`)} ${m.width}w`}
      sizes={sizes}
      width={m.width}
      height={m.height}
      alt={l(project.bannerAlt)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      {...(eager ? { fetchpriority: 'high' } : {})}
    />
  );
}

export function StatusBadge({ project }: { project: Project }) {
  const { l } = useI18n();
  return (
    <span className={`badge badge--${project.status.tone}`}>
      <span className="badge__dot" aria-hidden="true" />
      {l(project.status.label)}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  level = 2,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  id?: string;
  level?: 1 | 2;
}) {
  const H = level === 1 ? 'h1' : 'h2';
  return (
    <div className="section-header">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H id={id} className="section-title">
        {title}
      </H>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}

export function Notice({ title, children, tone = 'warn' }: { title: string; children: ReactNode; tone?: 'warn' | 'info' }) {
  return (
    <aside className={`notice notice--${tone}`}>
      <span className="notice__icon"><Warn size={20} /></span>
      <div>
        <p className="notice__title">{title}</p>
        <p className="notice__body">{children}</p>
      </div>
    </aside>
  );
}

/**
 * Adds `is-visible` when the element scrolls into view. Content is fully
 * visible without JS or with reduced motion: the hidden start state only
 * applies under `html.motion-ok`, which the inline boot script sets.
 */
export function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`reveal ${className}`} style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}

export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener">
      {children}
    </a>
  );
}
