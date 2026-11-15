/**
 * Fixed, decorative backdrop: a faint die grid, circuit traces and a few
 * signal pulses. Pure SVG + CSS; pulses stop under prefers-reduced-motion.
 */
const traces = [
  'M-20 140 H180 L230 190 H420 L470 140 H760',
  'M-20 300 H90 L140 350 H330',
  'M1460 120 H1250 L1200 170 H1010 L960 220 H820',
  'M1460 420 H1330 L1280 470 H1080',
  'M-20 680 H220 L270 630 H520 L570 680 H700',
  'M1460 760 H1180 L1130 710 H930 L880 760 H760',
  'M300 -20 V80 L350 130 V260',
  'M1120 -20 V60 L1070 110 V300',
  'M640 920 V820 L690 770 V700',
];
const pulses = [0, 2, 4, 5, 7];
const pads = [
  [180, 140], [470, 140], [330, 350], [1010, 170], [1080, 470], [520, 680], [930, 710], [350, 260], [1070, 300],
];

export function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__glow bg__glow--a" />
      <div className="bg__glow bg__glow--b" />
      <svg className="bg__svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="bg-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,.035)" />
          </pattern>
          <radialGradient id="bg-fade" cx="50%" cy="30%" r="80%">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="bg-mask">
            <rect width="1440" height="900" fill="url(#bg-fade)" />
          </mask>
        </defs>
        <g mask="url(#bg-mask)">
          <rect width="1440" height="900" fill="url(#bg-grid)" />
          <g className="bg__traces">
            {traces.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
          <g className="bg__pulses">
            {pulses.map((i, n) => (
              <path key={i} d={traces[i]} pathLength={1} style={{ animationDelay: `${n * 1.7}s` }} />
            ))}
          </g>
          <g className="bg__pads">
            {pads.map(([x, y], i) => (
              <rect key={i} x={x - 4} y={y - 4} width="8" height="8" rx="2" />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
