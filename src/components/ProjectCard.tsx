import type { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { latestRelease, repo } from '../data/github';
import { repoUrl, type Project } from '../data/projects';
import { useI18n } from '../i18n/context';
import { ArrowRight, Download, GitHubIcon, Star } from './Icons';
import { Banner, StatusBadge, accentStyle } from './ui';

/** Tracks the pointer so the card's edge light follows it (CSS only uses it on hover). */
function track(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, l, to, date } = useI18n();
  const data = repo(project.slug);
  const release = latestRelease(project.slug);
  const detail = to(`/projects/${project.slug}/`);
  const titleId = `card-${project.slug}`;

  return (
    <article className="pcard" style={accentStyle(project)} onPointerMove={track} aria-labelledby={titleId}>
      <div className="pcard__media">
        <Banner project={project} eager={index < 2} sizes="(min-width: 1100px) 600px, (min-width: 720px) 50vw, 100vw" />
        <span className="pcard__index" aria-hidden="true">0{index + 1}</span>
      </div>
      <div className="pcard__body">
        <div className="pcard__top">
          <p className="pcard__console">
            {project.maker} {project.console} <span aria-hidden="true">·</span> {project.year}
          </p>
          <StatusBadge project={project} />
        </div>
        <h3 className="pcard__title" id={titleId}>
          <Link to={detail} className="pcard__title-link">
            {project.name}
          </Link>
        </h3>
        <p className="pcard__summary">{l(project.summary)}</p>
        <dl className="pcard__facts">
          <div>
            <dt>{t.cards.console}</dt>
            <dd>{project.console}</dd>
          </div>
          <div>
            <dt>{t.cards.tech}</dt>
            <dd>{l(project.tech)}</dd>
          </div>
        </dl>
        <p className="pcard__meta">
          {data && (
            <>
              <span className="pcard__stars">
                <Star size={14} /> {t.cards.stars(data.stars)}
              </span>
              <span>{t.cards.updated(date(data.lastCommitAt))}</span>
            </>
          )}
          {!release && <span className="pcard__norel">{t.cards.noRelease}</span>}
        </p>
        <div className="pcard__actions">
          <Link to={detail} className="btn btn--accent" aria-describedby={titleId}>
            {t.cards.details} <ArrowRight size={16} />
          </Link>
          <a href={repoUrl(project.slug)} className="btn btn--ghost" target="_blank" rel="noopener" aria-describedby={titleId}>
            <GitHubIcon size={16} /> {t.cards.github}
          </a>
          {release && (
            <a href={release.url} className="btn btn--ghost" target="_blank" rel="noopener">
              <Download size={16} /> {t.cards.download(release.tag)}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
