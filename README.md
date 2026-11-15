# Native Projects

Official site for four experimental, open-source console research projects:

| Project | Console | Approach |
|---|---|---|
| [x360-native](https://github.com/fabegalo/x360-native) | Xbox 360 | PowerPC AOT → C++, ReXGlue runtime, original Dashboard 17559 |
| [ps2-native](https://github.com/fabegalo/ps2-native) | PlayStation 2 | EE/IOP/VU AOT via PS2Recomp, native HLE, original BIOS/Browser |
| [xone-native](https://github.com/fabegalo/xone-native) | Xbox One | x86-64 ERA execution, KernelX/WinRT, local dashboard + SystemOS goal |
| [ps3-native](https://github.com/fabegalo/ps3-native) | PlayStation 3 | PPU/SPU AOT via ps3recomp, RSX, original VSH/XMB goal |

**Live site:** https://fabegalo.github.io/native-projects/ (English) · https://fabegalo.github.io/native-projects/pt-br/ (Português)

## Stack

- Vite + React 18 + TypeScript, React Router.
- Every route is **prerendered at build time** (`scripts/prerender.mjs`) to static HTML with its own title, description, canonical, `hreflang` and Open Graph tags, then hydrated in the browser.
- No backend. GitHub data (stars, releases, last commit) is fetched **at build time** by `scripts/fetch-github.mjs` and stored as a static snapshot in `src/data/github-snapshot.json`. If the API is unavailable or rate limited, the previous snapshot is kept and marked stale — the build never fails because of GitHub. No token ever reaches the browser.
- Self-hosted variable fonts, inline SVG artwork, CSS-only animations that switch off under `prefers-reduced-motion`.

## Structure

```
src/
  data/projects.ts          Project content (EN + PT-BR), sourced from each repo's README/STATUS
  data/github-snapshot.json Build-time GitHub snapshot
  data/media.json           Dimensions of the imported banners and captures
  i18n/strings.ts           UI copy; Portuguese is type-checked against English
  components/               Header, Footer, ProjectCard, Gallery (lightbox), Motif, HeroDie…
  pages/                    Home, ProjectPage, About, Contribute, FAQ, NotFound
  seo.ts                    Per-route metadata shared by the prerender and the client
public/media/<project>/     Official banners and real captures, converted to WebP
scripts/
  fetch-github.mjs          GitHub snapshot (run by CI before each build)
  prerender.mjs             Static HTML per route, 404.html, sitemap.xml, robots.txt
  optimize-images.mjs       One-shot import of banners/captures from the project repos
  brand-assets.mjs          Favicons, manifest and home Open Graph image
```

## Develop

```sh
npm ci
npm run dev          # http://localhost:5173/native-projects/
npm run build        # typecheck + client build + prerender into dist/
npm run build:fresh  # refresh the GitHub snapshot first
npm run preview
```

## Deploy

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`, on manual dispatch and once a day (to refresh the snapshot). Pages must use **GitHub Actions** as its source.

## Content rules

Content must match what the project repositories document. Do not add compatibility, gameplay, FPS, platform or release claims that the repositories do not make; real captures only, with the local xone-native dashboard always labelled as a recreation. Banners and captures come from the project repositories; game and system imagery belongs to its respective owners.

Not affiliated with Microsoft or Sony. Xbox and PlayStation names and marks belong to their owners.

## License

Site code: [BSD-3-Clause](LICENSE). Each project keeps its own license.
