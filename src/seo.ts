import { projects, projectBySlug } from './data/projects';
import { strings, htmlLang, type Lang } from './i18n/strings';
import { localize, langOfPath } from './i18n/context';
import { SITE_URL } from './lib/site';

export interface Head {
  lang: Lang;
  htmlLang: string;
  title: string;
  description: string;
  canonical: string;
  alternates: { hreflang: string; href: string }[];
  image: string;
  imageAlt: string;
  type: 'website' | 'article';
  noindex: boolean;
}

/** Router paths (language-neutral) of every page that is prerendered. */
export const pagePaths = [
  '/',
  ...projects.map((p) => `/projects/${p.slug}/`),
  '/about/',
  '/tutorials/',
  '/contribute/',
  '/faq/',
];

export const allRoutes = (['en', 'pt'] as Lang[]).flatMap((lang) => pagePaths.map((p) => localize(p, lang)));

const abs = (path: string) => `${SITE_URL}${path}`;

export function headFor(pathname: string): Head {
  const lang = langOfPath(pathname);
  const t = strings[lang];
  const bare = pathname.replace(/^\/pt-br(?=\/|$)/, '') || '/';
  const known = pagePaths.includes(bare);
  let title = t.meta.homeTitle;
  let description = t.meta.homeDescription;
  let image = abs('/og-image.jpg');
  let imageAlt = t.meta.homeTitle;
  let type: Head['type'] = 'website';

  const m = bare.match(/^\/projects\/([^/]+)\/$/);
  const project = m ? projectBySlug(m[1]) : undefined;
  if (project) {
    title = `${t.meta.projectTitle(project.name, project.console)} · ${t.meta.siteName}`;
    description = project.summary[lang];
    image = abs(`/media/${project.slug}/og.jpg`);
    imageAlt = project.bannerAlt[lang];
    type = 'article';
  } else if (bare === '/about/') {
    title = `${t.meta.aboutTitle} · ${t.meta.siteName}`;
    description = t.meta.aboutDescription;
  } else if (bare === '/contribute/') {
    title = `${t.meta.contributeTitle} · ${t.meta.siteName}`;
    description = t.meta.contributeDescription;
  } else if (bare === '/tutorials/') {
    title = `${t.meta.tutorialsTitle} · ${t.meta.siteName}`;
    description = t.meta.tutorialsDescription;
  } else if (bare === '/faq/') {
    title = `${t.meta.faqTitle} · ${t.meta.siteName}`;
    description = t.meta.faqDescription;
  } else if (!known) {
    title = `${t.meta.notFoundTitle} · ${t.meta.siteName}`;
  }

  return {
    lang,
    htmlLang: htmlLang[lang],
    title,
    description,
    canonical: abs(localize(bare, lang)),
    alternates: known
      ? [
          { hreflang: 'en', href: abs(localize(bare, 'en')) },
          { hreflang: 'pt-BR', href: abs(localize(bare, 'pt')) },
          { hreflang: 'x-default', href: abs(localize(bare, 'en')) },
        ]
      : [],
    image,
    imageAlt,
    type,
    noindex: !known,
  };
}
