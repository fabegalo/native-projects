// Static prerender for GitHub Pages.
//
// For every route in both languages, renders the React tree to HTML and writes
// dist/<route>/index.html with route-specific <title>, description, canonical,
// hreflang and Open Graph tags. Also writes 404.html (client fallback for
// unknown paths), sitemap.xml and robots.txt.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const SITE = 'https://fabegalo.github.io/native-projects';

const { render, allRoutes, headFor } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function headTags(h) {
  const tags = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<link rel="canonical" href="${h.canonical}" />`,
    ...h.alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`),
    `<meta property="og:site_name" content="Native Projects" />`,
    `<meta property="og:type" content="${h.type}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${h.canonical}" />`,
    `<meta property="og:image" content="${h.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(h.imageAlt)}" />`,
    `<meta property="og:locale" content="${h.lang === 'pt' ? 'pt_BR' : 'en_US'}" />`,
    `<meta property="og:locale:alternate" content="${h.lang === 'pt' ? 'en_US' : 'pt_BR'}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${h.image}" />`,
  ];
  if (h.noindex) tags.push('<meta name="robots" content="noindex" />');
  return tags.join('\n    ');
}

function page(url, body) {
  const h = headFor(url);
  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${h.htmlLang}">`)
    .replace(/<!--head-->[\s\S]*<!--\/head-->/, headTags(h))
    .replace('<!--app-->', body);
}

let count = 0;
for (const route of allRoutes) {
  const html = page(route, render(route));
  const out = path.join(dist, route, 'index.html');
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
  count++;
}

// 404: GitHub Pages serves it for any unknown path. The app renders client-side
// from the real URL (so a /pt-br/... miss shows the Portuguese 404).
await writeFile(path.join(dist, '404.html'), page('/404', ''));

// Sitemap with hreflang alternates.
const urls = allRoutes
  .map((r) => {
    const h = headFor(r);
    const alts = h.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`).join('\n');
    return `  <url>\n    <loc>${h.canonical}</loc>\n${alts}\n  </url>`;
  })
  .join('\n');
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
// Pages must not run Jekyll over the output.
await writeFile(path.join(dist, '.nojekyll'), '');

await rm(ssrDir, { recursive: true, force: true });
console.log(`[prerender] ${count} pages, 404.html, sitemap.xml, robots.txt`);
