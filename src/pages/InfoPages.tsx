import { Link } from 'react-router-dom';
import { ArrowRight, Chevron, External } from '../components/Icons';
import { Reveal, SectionHeader, accentStyle } from '../components/ui';
import { repo } from '../data/github';
import { projects, repoLink, repoUrl } from '../data/projects';
import { useI18n } from '../i18n/context';
import { GITHUB_PROFILE } from '../lib/site';

export function About() {
  const { t } = useI18n();
  return (
    <div className="page">
      <section className="container page__head">
        <SectionHeader level={1} title={t.about.title} intro={t.about.lead} />
      </section>
      <section className="container">
        <ol className="pillars pillars--wide">
          {t.about.sections.map((s, i) => (
            <Reveal as="li" key={s.title} className="pillar" delay={(i % 2) * 70}>
              <span className="pillar__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="pillar__title">{s.title}</h2>
              <p>{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <p className="maintainer">
          {t.about.maintainer}{' '}
          <a href={GITHUB_PROFILE} target="_blank" rel="noopener">@fabegalo</a>
        </p>
      </section>
    </div>
  );
}

export function Contribute() {
  const { t, l } = useI18n();
  return (
    <div className="page">
      <section className="container page__head">
        <SectionHeader level={1} title={t.contribute.title} intro={t.contribute.lead} />
      </section>
      <section className="container section--tight" aria-labelledby="ways">
        <h2 id="ways" className="h3">{t.contribute.waysTitle}</h2>
        <ul className="ways">
          {t.contribute.ways.map((w) => (
            <li key={w.title} className="way">
              <h3>{w.title}</h3>
              <p>{w.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="container section--tight" aria-labelledby="rules">
        <h2 id="rules" className="h3">{t.contribute.rulesTitle}</h2>
        <ul className="checklist checklist--rules">
          {t.contribute.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>
      <section className="container section--tight" aria-labelledby="per-project">
        <h2 id="per-project" className="h3">{t.contribute.perProject}</h2>
        <ul className="contrib-grid">
          {projects.map((p) => {
            const d = repo(p.slug);
            const url = repoUrl(p.slug);
            return (
              <li key={p.slug} className="contrib" style={accentStyle(p)}>
                <p className="eyebrow">{p.console}</p>
                <h3>{p.name}</h3>
                <p className="small">{l(p.license)}</p>
                <ul className="linklist">
                  {p.contributing && (
                    <li><a href={repoLink(p.slug, p.contributing)} target="_blank" rel="noopener">{t.project.contributing} <External size={14} /></a></li>
                  )}
                  <li><a href={`${url}/issues`} target="_blank" rel="noopener">{t.project.issues} <External size={14} /></a></li>
                  {d?.hasDiscussions && (
                    <li><a href={`${url}/discussions`} target="_blank" rel="noopener">{t.project.discussions} <External size={14} /></a></li>
                  )}
                  <li><a href={`${url}/blob/main/LICENSE`} target="_blank" rel="noopener">{t.project.license} <External size={14} /></a></li>
                </ul>
                {d && !d.hasDiscussions && <p className="tiny">{t.contribute.discussionsOff}</p>}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export function Faq() {
  const { t, to } = useI18n();
  return (
    <div className="page">
      <section className="container page__head">
        <SectionHeader level={1} title={t.faq.title} />
      </section>
      <section className="container">
        <div className="faq">
          {t.faq.items.map((item, i) => (
            <details key={i} className="faq__item" open={i === 0}>
              <summary>
                <span>{item.q}</span>
                <Chevron size={20} />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <p className="faq__more">
          <Link to={to('/contribute/')} className="btn btn--ghost">
            {t.cta.contribute} <ArrowRight size={16} />
          </Link>
        </p>
      </section>
    </div>
  );
}
