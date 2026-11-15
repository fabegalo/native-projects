import type { Slug } from '../data/projects';

/**
 * Per-project decorative motif behind the project hero. Each one is drawn from
 * the console's hardware vocabulary so the pages feel distinct while sharing
 * one visual language. Abstract shapes only; no trademarks.
 */
export function Motif({ slug }: { slug: Slug }) {
  return (
    <svg className={`motif motif--${slug}`} viewBox="0 0 800 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {slug === 'x360-native' && (
        // Three PowerPC cores orbiting a ring of light.
        <g>
          {[200, 150, 100].map((r, i) => (
            <circle key={r} cx="600" cy="220" r={r} className="motif__ring" style={{ animationDelay: `${i * 1.2}s` }} />
          ))}
          {[0, 120, 240].map((a) => (
            <rect
              key={a}
              x="588"
              y="8"
              width="24"
              height="24"
              rx="5"
              className="motif__node"
              transform={`rotate(${a} 600 220) translate(0 62)`}
            />
          ))}
        </g>
      )}
      {slug === 'ps2-native' && (
        // Instruction stream lanes: EE, IOP, VU0, VU1.
        <g>
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1="380" x2="820" y1={80 + i * 38} y2={80 + i * 38} className="motif__lane" style={{ animationDelay: `${i * 0.35}s` }} />
          ))}
          {['EE', 'IOP', 'VU0', 'VU1'].map((s, i) => (
            <text key={s} x="760" y={104 + i * 76} textAnchor="end" className="motif__label">{s}</text>
          ))}
        </g>
      )}
      {slug === 'xone-native' && (
        // Three isolated partitions: HostOS, SystemOS, GameOS.
        <g>
          {['HostOS', 'SystemOS', 'GameOS'].map((s, i) => (
            <g key={s}>
              <rect x={430 + i * 30} y={70 + i * 90} width="320" height="70" rx="14" className="motif__part" style={{ animationDelay: `${i * 0.8}s` }} />
              <text x={452 + i * 30} y={112 + i * 90} className="motif__label">{s}</text>
            </g>
          ))}
        </g>
      )}
      {slug === 'ps3-native' && (
        // One PPU feeding six SPU lanes on a ring bus.
        <g>
          <rect x="420" y="190" width="90" height="90" rx="12" className="motif__node" />
          <text x="465" y="241" textAnchor="middle" className="motif__label">PPU</text>
          {Array.from({ length: 6 }, (_, i) => {
            const y = 70 + i * 66;
            return (
              <g key={i}>
                <path d={`M510 235 C560 235 560 ${y} 610 ${y} H700`} className="motif__lane" style={{ animationDelay: `${i * 0.4}s` }} />
                <rect x="700" y={y - 16} width="70" height="32" rx="7" className="motif__part" />
                <text x="735" y={y + 5} textAnchor="middle" className="motif__label motif__label--sm">SPU</text>
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
}
