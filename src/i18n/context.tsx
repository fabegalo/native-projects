import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { strings, type Lang } from './strings';

const LangContext = createContext<Lang>('en');

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

/** Path inside the router (without the /native-projects base). */
export function localize(path: string, lang: Lang): string {
  if (lang === 'en') return path;
  return path === '/' ? '/pt-br/' : `/pt-br${path}`;
}

/** Same page in the other language. */
export function counterpart(pathname: string, target: Lang): string {
  const bare = pathname.replace(/^\/pt-br(?=\/|$)/, '') || '/';
  return localize(bare, target);
}

export const langOfPath = (pathname: string): Lang => (/^\/pt-br(\/|$)/.test(pathname) ? 'pt' : 'en');

export function formatDate(iso: string | null | undefined, lang: Lang): string {
  if (!iso) return '—';
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  return new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(d);
}

export function useI18n() {
  const lang = useContext(LangContext);
  return useMemo(
    () => ({
      lang,
      t: strings[lang],
      to: (path: string) => localize(path, lang),
      date: (iso: string | null | undefined) => formatDate(iso, lang),
      l: (v: { en: string; pt: string }) => v[lang],
    }),
    [lang],
  );
}
