import { Link } from 'react-router-dom';
import { anyStale, snapshotDate } from '../data/github';
import { projects } from '../data/projects';
import { useI18n } from '../i18n/context';
import { GITHUB_PROFILE, SITE_REPO } from '../lib/site';
import { Mark } from './Icons';

export function Footer() {
  const { t, to, date } = useI18n();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="brand brand--static">
            <Mark />
            <span className="brand__text">
              Native<span>Projects</span>
            </span>
          </div>
          <p>{t.footer.tagline}</p>
          <p className="footer__snapshot">
            {snapshotDate ? t.snapshot.label(date(snapshotDate)) : t.snapshot.unavailable}
            {anyStale && <span className="footer__stale"> {t.snapshot.stale}</span>}
          </p>
        </div>
        <nav aria-label={t.footer.projects}>
          <h2 className="footer__h">{t.footer.projects}</h2>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <Link to={to(`/projects/${p.slug}/`)}>
                  {p.name} <span className="footer__dim">· {p.console}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t.footer.site}>
          <h2 className="footer__h">{t.footer.site}</h2>
          <ul>
            <li><Link to={to('/about/')}>{t.nav.about}</Link></li>
            <li><Link to={to('/contribute/')}>{t.nav.contribute}</Link></li>
            <li><Link to={to('/faq/')}>{t.nav.faq}</Link></li>
          </ul>
        </nav>
        <nav aria-label={t.footer.official}>
          <h2 className="footer__h">{t.footer.official}</h2>
          <ul>
            <li><a href={GITHUB_PROFILE} target="_blank" rel="noopener">{t.footer.profile}</a></li>
            <li><a href="https://github.com/fabegalo/x360-native/releases" target="_blank" rel="noopener">{t.footer.releases}</a></li>
            <li><a href={SITE_REPO} target="_blank" rel="noopener">{t.footer.sourceSite}</a></li>
          </ul>
        </nav>
      </div>
      <div className="container footer__legal">
        <p>{t.footer.legal}</p>
        <p>{t.footer.license}</p>
      </div>
    </footer>
  );
}
