import { useEffect, useRef } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Background } from './components/Background';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LangProvider, useI18n } from './i18n/context';
import type { Lang } from './i18n/strings';
import { About, Contribute, Faq } from './pages/InfoPages';
import { Tutorials } from './pages/Tutorials';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ProjectPage } from './pages/ProjectPage';
import { headFor } from './seo';

/** Keeps <title>, description and <html lang> in sync on client navigation. */
function useHead() {
  const { pathname } = useLocation();
  useEffect(() => {
    const h = headFor(pathname);
    document.title = h.title;
    document.documentElement.lang = h.htmlLang;
    document.querySelector('meta[name="description"]')?.setAttribute('content', h.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', h.canonical);
  }, [pathname]);
}

/** Scroll to the top (or to #hash) on navigation, and move focus for screen readers. */
function useNavigationFocus() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      if (!hash) return;
    }
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        el.focus({ preventScroll: true });
        return;
      }
    }
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname, hash]);
}

function Shell() {
  const { t } = useI18n();
  useHead();
  useNavigationFocus();
  return (
    <>
      <a href="#main" className="skip">{t.a11y.skip}</a>
      <Background />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function LangRoutes({ lang }: { lang: Lang }) {
  return (
    <LangProvider lang={lang}>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Home />} />
          <Route path="projects/:slug" element={<ProjectPage />} />
          <Route path="about" element={<About />} />
          <Route path="tutorials" element={<Tutorials />} />
          <Route path="contribute" element={<Contribute />} />
          <Route path="faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LangProvider>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/pt-br/*" element={<LangRoutes lang="pt" />} />
      <Route path="/*" element={<LangRoutes lang="en" />} />
    </Routes>
  );
}
