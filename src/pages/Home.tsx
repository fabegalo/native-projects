import { Link } from 'react-router-dom';
import { HeroDie } from '../components/HeroDie';
import { ArrowRight, GitHubIcon } from '../components/Icons';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal, SectionHeader, accentStyle } from '../components/ui';
import { projectsWithReleases, totalStars } from '../data/github';
import { projects } from '../data/projects';
import { useI18n } from '../i18n/context';
import { GITHUB_PROFILE } from '../lib/site';

export function Home() {
  const { t, to } = useI18n();
  const stats = [
    { value: String(projects.length), label: t.stats.projects },
    { value: '4', label: t.stats.architectures },
    { value: String(totalStars), label: t.stats.stars },
    { value: `${projectsWithReleases}/${projects.length}`, label: t.stats.releases },
  ];

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow">{t.hero.eyebrow}</p>
            <h1 id="hero-title" className="hero__title">
              <span>{t.hero.title1}</span>
              <span className="hero__title-accent">{t.hero.title2}</span>
            </h1>
            <p className="hero__subtitle">{t.hero.subtitle}</p>
            <div className="hero__actions">
              <Link to={to('/#projects')} className="btn btn--primary btn--lg">
                {t.hero.explore} <ArrowRight size={18} />
              </Link>
              <a href={GITHUB_PROFILE} className="btn btn--ghost btn--lg" target="_blank" rel="noopener">
                <GitHubIcon size={18} /> {t.hero.github}
              </a>
            </div>
            <ul className="hero__chips" aria-label={t.cards.heading}>
              {projects.map((p) => (
                <li key={p.slug} style={accentStyle(p)}>
                  <Link to={to(`/projects/${p.slug}/`)} className="chip">
                    <span className="chip__dot" aria-hidden="true" />
                    {p.console}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <HeroDie caption={t.hero.dieCaption} />
        </div>
        <div className="container">
          <dl className="stats">
            {stats.map((s) => (
              <div key={s.label} className="stats__item">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" id="projects" aria-labelledby="projects-title" tabIndex={-1}>
        <div className="container">
          <Reveal>
            <SectionHeader id="projects-title" eyebrow="01" title={t.cards.heading} intro={t.cards.intro} />
          </Reveal>
          <ul className="pgrid">
            {projects.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 2) * 90}>
                <ProjectCard project={p} index={i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--vision" id="vision" aria-labelledby="vision-title" tabIndex={-1}>
        <div className="container">
          <Reveal>
            <SectionHeader id="vision-title" eyebrow="02" title={t.vision.heading} intro={t.vision.intro} />
          </Reveal>
          <ol className="pillars">
            {t.vision.pillars.map((p, i) => (
              <Reveal as="li" key={p.title} className="pillar" delay={(i % 3) * 70}>
                <span className="pillar__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="pillar__title">{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </ol>
          <p className="vision__note">{t.vision.note}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="arch-title">
        <div className="container">
          <Reveal>
            <SectionHeader id="arch-title" eyebrow="03" title={t.arch.heading} />
          </Reveal>
          <ul className="archlist">
            {projects.map((p) => (
              <Reveal as="li" key={p.slug} className="archlist__row">
                <div style={accentStyle(p)} className="archlist__inner">
                  <span className="archlist__isa">{p.isa}</span>
                  <div className="archlist__who">
                    <Link to={to(`/projects/${p.slug}/`)}>{p.name}</Link>
                    <span>{p.silicon}</span>
                  </div>
                  <p className="archlist__how">{t.arch.rows[p.slug]}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="cta">
            <h2 id="cta-title" className="cta__title">{t.cta.heading}</h2>
            <p>{t.cta.body}</p>
            <div className="cta__actions">
              <Link to={to('/contribute/')} className="btn btn--primary">
                {t.cta.contribute} <ArrowRight size={16} />
              </Link>
              <Link to={to('/faq/')} className="btn btn--ghost">
                {t.cta.faq}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
