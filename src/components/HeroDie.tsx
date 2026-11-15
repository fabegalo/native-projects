import type { CSSProperties } from 'react';
import { projects } from '../data/projects';

/**
 * Hero artwork: an abstract four-core die. Each quadrant carries the
 * instruction-set family of one project. It is an illustration, not a diagram
 * of any real chip, and is hidden from assistive technology.
 */
const cells = [
  { x: 40, y: 40 },
  { x: 220, y: 40 },
  { x: 40, y: 220 },
  { x: 220, y: 220 },
];
const pins = Array.from({ length: 14 }, (_, i) => 41 + i * 24.5);

export function HeroDie({ caption }: { caption: string }) {
  return (
    <figure className="die">
      <svg viewBox="0 0 400 400" className="die__svg" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="die-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#161c26" />
            <stop offset="1" stopColor="#080b10" />
          </linearGradient>
          <pattern id="die-fine" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M6 0H0V6" fill="none" stroke="rgba(255,255,255,.045)" strokeWidth=".6" />
          </pattern>
        </defs>
        <g className="die__pins">
          {pins.map((p) => (
            <g key={p}>
              <rect x={p - 3} y="2" width="6" height="16" rx="1.5" />
              <rect x={p - 3} y="382" width="6" height="16" rx="1.5" />
              <rect x="2" y={p - 3} width="16" height="6" rx="1.5" />
              <rect x="382" y={p - 3} width="16" height="6" rx="1.5" />
            </g>
          ))}
        </g>
        <rect x="18" y="18" width="364" height="364" rx="22" fill="url(#die-body)" stroke="rgba(255,255,255,.12)" />
        <rect x="18" y="18" width="364" height="364" rx="22" fill="url(#die-fine)" />
        <g className="die__bus">
          <path d="M200 30V370M30 200H370" />
          <circle cx="200" cy="200" r="24" />
        </g>
        {projects.map((p, i) => {
          const c = cells[i];
          const style = { '--accent': p.accent, '--delay': `${i * 1.1}s` } as CSSProperties;
          return (
            <g key={p.slug} className="die__core" style={style}>
              <rect x={c.x} y={c.y} width="140" height="140" rx="14" className="die__core-body" />
              <rect x={c.x + 12} y={c.y + 12} width="116" height="116" rx="9" className="die__core-inner" />
              {[0, 1, 2, 3].map((k) => (
                <rect key={k} x={c.x + 24 + k * 24} y={c.y + 88} width="16" height="24" rx="3" className="die__cell" />
              ))}
              <text x={c.x + 24} y={c.y + 50} className="die__isa">
                {p.isa}
              </text>
              <text x={c.x + 24} y={c.y + 70} className="die__name">
                {p.console.toUpperCase()}
              </text>
            </g>
          );
        })}
        <text x="200" y="204" textAnchor="middle" className="die__hub">
          AOT
        </text>
      </svg>
      <figcaption className="die__caption">{caption}</figcaption>
    </figure>
  );
}
