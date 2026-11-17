// One-shot media import: converts the official banners and real captures that
// live in the four project repositories into web-optimized assets.
//
// Usage: node scripts/optimize-images.mjs <dir-with-the-four-clones>
//
// The output (public/media/**) and its manifest (src/data/media.json) are
// committed, so the regular build never needs this script or network access.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/optimize-images.mjs <clones-dir>');
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'public', 'media');

/** Every image here exists in the named repository; nothing is generated. */
const sources = {
  'x360-native': {
    banner: 'docs/assets/x360-native-banner.png',
    shots: {
      'dashboard-home': 'docs/evidence/native-n2-2026-10-14/xenos-home.png',
      'dashboard-games': 'docs/evidence/native-n2-2026-10-14/native-games.png',
      'castle-crashers-menu': 'docs/assets/screenshots/castle-crashers-menu.jpg',
      'forza-horizon-driving': 'docs/assets/screenshots/forza-horizon-driving.jpg',
      'forza-horizon-2-title': 'docs/assets/screenshots/forza-horizon-2-title.jpg',
      'minecraft-tutorial-world': 'docs/assets/screenshots/minecraft-tutorial-world.jpg',
    },
  },
  'ps2-native': { banner: 'docs/assets/ps2-native-banner.webp', shots: {} },
  'xone-native': {
    banner: 'docs/assets/xone-native-banner.webp',
    shots: {
      'sonic-mania-title': 'docs/assets/screenshots/sonic-mania-title.png',
      'local-dashboard-home': 'docs/assets/screenshots/local-dashboard-home.png',
      'forza-horizon-2-title': 'docs/assets/screenshots/forza-horizon-2-title.webp',
    },
  },
  'ps3-native': { banner: 'docs/assets/ps3-native-banner.png', shots: {} },
};

const manifest = {};

for (const [slug, def] of Object.entries(sources)) {
  const dir = path.join(out, slug);
  await mkdir(dir, { recursive: true });
  const entry = { banner: null, shots: {} };

  const bannerIn = path.join(src, slug, def.banner);
  const meta = await sharp(bannerIn).metadata();
  const full = Math.min(meta.width, 2000);
  await sharp(bannerIn).resize({ width: full }).webp({ quality: 88 }).toFile(path.join(dir, 'banner.webp'));
  await sharp(bannerIn).resize({ width: 960 }).webp({ quality: 84 }).toFile(path.join(dir, 'banner-960.webp'));
  // Social preview: the banner letterboxed (never cropped) into 1200x630.
  await sharp(bannerIn)
    .resize({ width: 1200, height: 630, fit: 'contain', background: '#05070a' })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(dir, 'og.jpg'));
  entry.banner = {
    width: full,
    height: Math.round((meta.height * full) / meta.width),
    source: def.banner,
  };

  for (const [name, rel] of Object.entries(def.shots)) {
    const input = path.join(src, slug, rel);
    const m = await sharp(input).metadata();
    const w = Math.min(m.width, 1920);
    await sharp(input).resize({ width: w }).webp({ quality: 86 }).toFile(path.join(dir, `${name}.webp`));
    await sharp(input).resize({ width: 640 }).webp({ quality: 80 }).toFile(path.join(dir, `${name}-640.webp`));
    entry.shots[name] = { width: w, height: Math.round((m.height * w) / m.width), source: rel };
  }
  manifest[slug] = entry;
  console.log(`${slug}: banner ${meta.width}x${meta.height}, ${Object.keys(def.shots).length} capture(s)`);
}

await writeFile(path.join(root, 'src', 'data', 'media.json'), JSON.stringify(manifest, null, 2) + '\n');
