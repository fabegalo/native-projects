import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { counterpart, useI18n } from '../i18n/context';
import type { Lang } from '../i18n/strings';
import { GITHUB_PROFILE } from '../lib/site';
import { Close, GitHubIcon, Mark, Menu } from './Icons';

export const LANG_KEY = 'np-lang';

function LangSwitch() {
  const { lang, t } = useI18n();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const choose = (target: Lang) => {
    try {
      localStorage.setItem(LANG_KEY, target);
    } catch {
      /* storage unavailable: the choice still applies to this navigation */
    }
    if (target !== lang) navigate(counterpart(pathname, target) + hash);
  };
  return (
    <div className="lang" role="group" aria-label={t.a11y.language}>
      {(['en', 'pt'] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          className="lang__btn"
          aria-pressed={l === lang}
          lang={l === 'en' ? 'en' : 'pt-BR'}
          onClick={() => choose(l)}
        >
          {l === 'en' ? 'EN' : 'PT-BR'}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t, to } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { href: to('/#projects'), label: t.nav.projects, hash: true },
    { href: to('/#vision'), label: t.nav.vision, hash: true },
    { href: to('/tutorials/'), label: t.nav.tutorials },
    { href: to('/about/'), label: t.nav.about },
    { href: to('/contribute/'), label: t.nav.contribute },
    { href: to('/faq/'), label: t.nav.faq },
  ];

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}${open ? ' header--open' : ''}`}>
      <div className="header__inner container">
        <Link to={to('/')} className="brand" aria-label="Native Projects — home">
          <Mark />
          <span className="brand__text">
            Native<span>Projects</span>
          </span>
        </Link>
        <nav className="nav" aria-label={t.a11y.mainNav} id="main-nav">
          <ul className="nav__list">
            {links.map((l) => (
              <li key={l.href}>
                {l.hash ? (
                  <Link to={l.href} className="nav__link">
                    {l.label}
                  </Link>
                ) : (
                  <NavLink to={l.href} className="nav__link">
                    {l.label}
                  </NavLink>
                )}
              </li>
            ))}
            <li>
              <a href={GITHUB_PROFILE} className="nav__link nav__link--gh" target="_blank" rel="noopener">
                <GitHubIcon size={18} />
                <span>{t.nav.github}</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="header__tools">
          <LangSwitch />
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? t.a11y.closeMenu : t.a11y.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
