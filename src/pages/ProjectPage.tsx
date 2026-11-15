import { Link, useParams } from 'react-router-dom';
import { Gallery } from '../components/Gallery';
import { Videos } from '../components/Videos';
import { ArrowLeft, Download, External, GitHubIcon, Star } from '../components/Icons';
import { Motif } from '../components/Motif';
import { Banner, Notice, Reveal, SectionHeader, StatusBadge, accentStyle } from '../components/ui';
import { assetLabel, latestRelease, repo } from '../data/github';
import { projectBySlug, projects, repoLink, repoUrl, type Project } from '../data/projects';
import { useI18n } from '../i18n/context';
import { NotFound } from './NotFound';

const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

function Releases({ project }: { project: Project }) {
  const { t, date } = useI18n();
  const data = repo(project.slug);
  const releases = data?.releases ?? [];
  const latest = latestRelease(project.slug);
  if (!releases.length) {
    return <p className="empty">{t.project.noReleases}</p>;
  }
  return (
    <div className="releases">
      {latest && (
        <article className="release release--latest">
          <header className="release__head">
            <span className="tag tag--accent">{t.project.latest}</span>
            <h3 className="release__name">
              <a href={latest.url} target="_blank" rel="noopener">{latest.name}</a>
            </h3>
            <p className="release__date">{t.project.publishedOn(date(latest.publishedAt))}</p>
          </header>
          {latest.assets.length > 0 && (
            <>
              <h4 className="release__sub">{t.project.assets}</h4>
              <ul className="assets">
                {latest.assets.map((a) => {
                  const lab = assetLabel(a.name);
                  return (
                    <li key={a.name}>
                      <a href={a.url} className="asset" rel="noopener">
                        <Download size={18} />
                        <span className="asset__main">
                          <span className="asset__os">{lab ? `${lab.os} · ${lab.arch}` : a.name}</span>
                          <span className="asset__file">{a.name}</span>
                        </span>
                        <span className="asset__size">{mb(a.size)}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          <p className="release__note">{t.project.downloadNote}</p>
        </article>
      )}
      {releases.filter((r) => r !== latest).map((r) => (
        <p key={r.tag} className="release release--older">
          <a href={r.url} target="_blank" rel="noopener">{r.name}</a> · {date(r.publishedAt)}
        </p>
      ))}
      <a className="link-arrow" href={`${repoUrl(project.slug)}/releases`} target="_blank" rel="noopener">
        {t.project.allReleases} <External size={14} />
      </a>
    </div>
  );
}

function Platforms({ project }: { project: Project }) {
  const { t, l } = useI18n();
  return (
    <>
      <ul className="platforms">
        {project.platforms.map((p) => (
          <li key={p.name} className={`platform platform--${p.state}`}>
            <span className="platform__icon" aria-hidden="true" />
            <span className="platform__name">{p.name}</span>
            <span className="platform__state">{t.project.platformLegend[p.state]}</span>
            {p.note && <span className="platform__note">{l(p.note)}</span>}
          </li>
        ))}
      </ul>
    </>
  );
}

function XoneDashboards() {
  const { t } = useI18n();
  return (
    <section className="section section--tight" aria-labelledby="xone-dash">
      <div className="container">
        <SectionHeader id="xone-dash" title={t.xone.heading} />
        <div className="dash-compare">
          <article className="dash-card dash-card--local">
            <p className="dash-card__state">{t.xone.localState}</p>
            <h3>{t.xone.localTitle}</h3>
            <p>{t.xone.localBody}</p>
          </article>
          <article className="dash-card dash-card--original">
            <p className="dash-card__state">{t.xone.originalState}</p>
            <h3>{t.xone.originalTitle}</h3>
            <p>{t.xone.originalBody}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function ProjectPage() {
  const { slug = '' } = useParams();
  const project = projectBySlug(slug);
  const { t, l, to, date } = useI18n();
  if (!project) return <NotFound />;

  const data = repo(project.slug);
  const release = latestRelease(project.slug);
  const url = repoUrl(project.slug);
  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className={`project project--${project.slug}`} style={accentStyle(project)}>
      <section className="phero" aria-labelledby="project-title">
        <Motif slug={project.slug} />
        <div className="container">
          <Link to={to('/#projects')} className="back">
            <ArrowLeft size={16} /> {t.project.back}
          </Link>
          <div className="phero__grid">
            <div className="phero__copy">
              <p className="eyebrow">
                {project.maker} {project.console} · {project.year}
              </p>
              <h1 id="project-title" className="phero__title">{project.name}</h1>
              <p className="phero__tagline">{l(project.tagline)}</p>
              <div className="phero__badges">
                <StatusBadge project={project} />
                <span className="tag">{l(project.tech)}</span>
              </div>
              <div className="phero__actions">
                <a href={url} className="btn btn--accent" target="_blank" rel="noopener">
                  <GitHubIcon size={16} /> {t.project.repository}
                </a>
                {release && (
                  <a href={release.url} className="btn btn--ghost" target="_blank" rel="noopener">
                    <Download size={16} /> {t.cards.download(release.tag)}
                  </a>
                )}
                <a href={`${url}/issues`} className="btn btn--ghost" target="_blank" rel="noopener">
                  {t.project.issues}
                </a>
              </div>
            </div>
            <dl className="facts">
              <div><dt>{t.project.consoleFacts}</dt><dd>{project.maker} {project.console}</dd></div>
              <div><dt>{t.project.released}</dt><dd>{project.year}</dd></div>
              <div><dt>{t.project.silicon}</dt><dd>{project.silicon}</dd></div>
              {data && (
                <>
                  <div><dt>{t.project.stars}</dt><dd><Star size={13} /> {data.stars}</dd></div>
                  <div><dt>{t.project.lastCommit}</dt><dd>{date(data.lastCommitAt)}</dd></div>
                  <div><dt>{t.project.licenseShort}</dt><dd>{data.license ?? '—'}</dd></div>
                </>
              )}
            </dl>
          </div>
          <figure className="phero__banner">
            <Banner project={project} eager sizes="(min-width: 1200px) 1140px, 100vw" />
            {project.bannerIsConcept && <figcaption>{t.project.conceptBanner}</figcaption>}
          </figure>
          <Notice title={t.project.experimentalTitle}>{t.project.experimentalBody}</Notice>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="overview">
        <div className="container split">
          <Reveal>
            <SectionHeader id="overview" title={t.project.overview} />
            {project.intro.map((p, i) => (
              <p key={i} className="prose">{l(p)}</p>
            ))}
          </Reveal>
          <Reveal className="goals" delay={80}>
            <h2 className="h3">{t.project.goals}</h2>
            <ul className="checklist">
              {project.goals.map((g, i) => (
                <li key={i}>{l(g)}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {project.slug === 'xone-native' && <XoneDashboards />}

      <section className="section section--tight" aria-labelledby="architecture">
        <div className="container">
          <SectionHeader id="architecture" title={t.project.architecture} />
          <ol className="pipeline">
            {project.pipeline.map((s, i) => (
              <Reveal as="li" key={i} className="pipeline__step" delay={i * 70}>
                <span className="pipeline__n" aria-hidden="true">{i + 1}</span>
                <h3>{l(s.title)}</h3>
                <p>{l(s.body)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="matrix">
        <div className="container">
          <SectionHeader id="matrix" title={t.project.matrix} />
          <div className="matrix-wrap">
            <table className="matrix">
              <thead>
                <tr>
                  <th scope="col">{t.project.matrixArea}</th>
                  <th scope="col">{t.project.matrixDone}</th>
                  <th scope="col">{t.project.matrixNext}</th>
                </tr>
              </thead>
              <tbody>
                {project.matrix.map((r, i) => (
                  <tr key={i}>
                    <th scope="row">{l(r.area)}</th>
                    <td data-label={t.project.matrixDone} className="matrix__done">{l(r.done)}</td>
                    <td data-label={t.project.matrixNext} className="matrix__next">{l(r.next)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="highlights">
        <div className="container split">
          <div>
            <SectionHeader id="highlights" title={t.project.highlights} intro={t.project.highlightsNote} />
            <ol className="timeline">
              {project.highlights.map((h, i) => (
                <li key={i}>
                  <time dateTime={h.date}>{date(h.date)}</time>
                  <p>{l(h.text)}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeader title={t.project.platforms} />
            <Platforms project={project} />
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="gallery">
        <div className="container">
          <SectionHeader id="gallery" title={t.project.gallery} intro={project.shots.length ? t.project.galleryNote : undefined} />
          {project.shots.length ? <Gallery project={project} /> : <p className="empty">{t.project.noShots}</p>}
        </div>
      </section>

      {project.videos.length > 0 && (
        <section className="section section--tight" aria-labelledby="videos">
          <div className="container">
            <SectionHeader id="videos" title={t.project.videos} intro={t.project.videosNote} />
            <Videos project={project} />
          </div>
        </section>
      )}

      <section className="section section--tight" aria-labelledby="releases">
        <div className="container">
          <SectionHeader id="releases" title={t.project.releases} />
          <Releases project={project} />
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="resources">
        <div className="container resources">
          <div>
            <SectionHeader id="resources" title={t.project.resources} />
            <h3 className="h4">{t.project.documentation}</h3>
            <ul className="linklist">
              {project.docs.map((d) => (
                <li key={d.path}>
                  <a href={repoLink(project.slug, d.path)} target="_blank" rel="noopener">
                    {l(d.label)} <External size={14} />
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="h4">GitHub</h3>
            <ul className="linklist">
              <li><a href={url} target="_blank" rel="noopener">{t.project.repository} <External size={14} /></a></li>
              {data?.hasIssues !== false && (
                <li><a href={`${url}/issues`} target="_blank" rel="noopener">{t.project.issues} <External size={14} /></a></li>
              )}
              {data?.hasDiscussions && (
                <li><a href={`${url}/discussions`} target="_blank" rel="noopener">{t.project.discussions} <External size={14} /></a></li>
              )}
              {project.contributing ? (
                <li><a href={repoLink(project.slug, project.contributing)} target="_blank" rel="noopener">{t.project.contributing} <External size={14} /></a></li>
              ) : (
                <li><a href={`${url}/issues`} target="_blank" rel="noopener">{t.project.contributeVia} <External size={14} /></a></li>
              )}
            </ul>
          </div>
          <div className="resources__side">
            <h3 className="h4">{t.project.license}</h3>
            <p className="small">
              <a href={`${url}/blob/main/LICENSE`} target="_blank" rel="noopener">{data?.license ?? 'LICENSE'}</a> — {l(project.license)}
            </p>
            <h3 className="h4">{t.project.credits}</h3>
            <p className="small">{l(project.credits)}</p>
          </div>
        </div>
      </section>

      <nav className="container next-project" aria-label={t.cards.heading} style={accentStyle(next)}>
        <Link to={to(`/projects/${next.slug}/`)} className="next-project__link">
          <span className="eyebrow">{next.console}</span>
          <span className="next-project__name">{next.name} →</span>
        </Link>
      </nav>
    </div>
  );
}
