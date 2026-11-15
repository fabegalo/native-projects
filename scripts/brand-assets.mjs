// One-shot generator for favicons, the web manifest and the home Open Graph
// image. Outputs are committed under public/. Run after scripts/optimize-images.mjs.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const pub = path.join(root, 'public');

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect x="1.5" y="1.5" width="29" height="29" rx="7" fill="#0b0f15" stroke="#3a4250"/>
  <rect x="6" y="6" width="9" height="9" rx="2" fill="#5bd95b"/>
  <rect x="17" y="6" width="9" height="9" rx="2" fill="#4cc9f0"/>
  <rect x="6" y="17" width="9" height="9" rx="2" fill="#3ee8a3"/>
  <rect x="17" y="17" width="9" height="9" rx="2" fill="#6e8bff"/>
</svg>
`;
await writeFile(path.join(pub, 'favicon.svg'), mark);
await sharp(Buffer.from(mark)).resize(32, 32).png().toFile(path.join(pub, 'favicon-32.png'));
await sharp(Buffer.from(mark)).resize(180, 180).flatten({ background: '#05070a' }).png().toFile(path.join(pub, 'apple-touch-icon.png'));
await sharp(Buffer.from(mark)).resize(512, 512).png().toFile(path.join(pub, 'icon-512.png'));

await writeFile(
  path.join(pub, 'site.webmanifest'),
  JSON.stringify(
    {
      name: 'Native Projects',
      short_name: 'Native',
      start_url: '/native-projects/',
      scope: '/native-projects/',
      display: 'browser',
      background_color: '#05070a',
      theme_color: '#05070a',
      icons: [
        { src: '/native-projects/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
        { src: '/native-projects/icon-512.png', type: 'image/png', sizes: '512x512' },
      ],
    },
    null,
    2,
  ) + '\n',
);

// Home OG image: the four official banners, each letterboxed (never cropped),
// under a title band.
const W = 1200, H = 630, PAD = 28, GAP = 14, TOP = 170;
const cellW = (W - PAD * 2 - GAP) / 2;
const cellH = (H - TOP - PAD - GAP) / 2;
const slugs = ['x360-native', 'ps2-native', 'xone-native', 'ps3-native'];
const tiles = await Promise.all(
  slugs.map((s) =>
    sharp(path.join(pub, 'media', s, 'banner.webp'))
      .resize({ width: Math.round(cellW), height: Math.round(cellH), fit: 'contain', background: '#030405' })
      .png()
      .toBuffer(),
  ),
);
const title = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${TOP}">
  <text x="${PAD}" y="62" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="22" letter-spacing="4" fill="#8693a3">NATIVE PROJECTS</text>
  <text x="${PAD}" y="124" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-weight="700" font-size="54" fill="#e9eef4">Four consoles. One native vision.</text>
</svg>`);
await sharp({ create: { width: W, height: H, channels: 3, background: '#05070a' } })
  .composite([
    { input: title, top: 0, left: 0 },
    ...tiles.map((input, i) => ({
      input,
      left: Math.round(PAD + (i % 2) * (cellW + GAP)),
      top: Math.round(TOP + Math.floor(i / 2) * (cellH + GAP)),
    })),
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(pub, 'og-image.jpg'));

console.log('brand assets written', (await readFile(path.join(pub, 'og-image.jpg'))).length, 'bytes og');
