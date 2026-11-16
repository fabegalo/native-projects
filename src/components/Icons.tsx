// Small inline icons (no icon font, no extra requests). All decorative.
type P = { size?: number };
const base = (size = 18) => ({ width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false } as const);
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export const GitHubIcon = ({ size }: P) => (
  <svg {...base(size)} fill="currentColor">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
export const ArrowRight = ({ size }: P) => (
  <svg {...base(size)} {...stroke}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = ({ size }: P) => (
  <svg {...base(size)} {...stroke}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
);
export const Download = ({ size }: P) => (
  <svg {...base(size)} {...stroke}><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg>
);
export const External = ({ size }: P) => (
  <svg {...base(size)} {...stroke}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
);
export const Star = ({ size }: P) => (
  <svg {...base(size)} fill="currentColor"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" /></svg>
);
export const Close = ({ size }: P) => (
  <svg {...base(size)} {...stroke}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Menu = ({ size }: P) => (
  <svg {...base(size)} {...stroke}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Chevron = ({ size }: P) => (
  <svg {...base(size)} {...stroke}><path d="m6 9 6 6 6-6" /></svg>
);
export const Warn = ({ size }: P) => (
  <svg {...base(size)} {...stroke}><path d="M12 3 2 20h20L12 3Z" /><path d="M12 10v4M12 17.5v.01" /></svg>
);
export const Expand = ({ size }: P) => (
  <svg {...base(size)} {...stroke}><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
);

/** Site mark: a four-quadrant die, one quadrant per project accent. */
export const Mark = ({ size = 28 }: P) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <rect x="1.5" y="1.5" width="29" height="29" rx="7" fill="#0b0f15" stroke="rgba(255,255,255,.18)" />
    <rect x="6" y="6" width="9" height="9" rx="2" fill="#5bd95b" />
    <rect x="17" y="6" width="9" height="9" rx="2" fill="#4cc9f0" />
    <rect x="6" y="17" width="9" height="9" rx="2" fill="#3ee8a3" />
    <rect x="17" y="17" width="9" height="9" rx="2" fill="#6e8bff" />
  </svg>
);
export const Copy = ({ size }: P) => (
  <svg {...base(size)} {...stroke}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a1 1 0 0 1 1-1h10" /></svg>
);
export const Check = ({ size }: P) => (
  <svg {...base(size)} {...stroke}><path d="m5 12 5 5 9-10" /></svg>
);
