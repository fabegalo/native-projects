import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Copy, Download, External } from '../components/Icons';
import { Notice, SectionHeader, accentStyle } from '../components/ui';
import { latestRelease } from '../data/github';
import { projectBySlug, repoLink, type Project } from '../data/projects';
import { tutorials, type Code, type Tutorial } from '../data/tutorials';
import { useI18n } from '../i18n/context';

function CodeBlock({ code }: { code: Code }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable: the text stays selectable */
    }
  };
  return (
    <figure className="code">
      <figcaption className="code__bar">
        <span>{code.label}</span>
        <button type="button" className="code__copy" onClick={copy} aria-label={t.tutorials.copyLabel(code.label)}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span aria-live="polite">{copied ? t.tutorials.copied : t.tutorials.copy}</span>
        </button>
      </figcaption>
      <pre tabIndex={0}><code>{code.text}</code></pre>
    </figure>
  );
}

function Guide({ tutorial, project }: { tutorial: Tutorial; project: Project }) {
  const { t, l, to } = useI18n();
  const release = latestRelease(project.slug);
  const headId = `${project.slug}-title`;
  return (
    <section id={project.slug} className="guide" style={accentStyle(project)} aria-labelledby={headId}>
      <header className="guide__head">
        <p className="eyebrow">
          {project.maker} {project.console} · {tutorial.audience === 'users' ? t.tutorials.users : t.tutorials.developers}
        </p>
        <h2 id={headId} className="guide__title">{project.name}</h2>
        <p className="guide__platform">{l(tutorial.platform)}</p>
        <div className="guide__actions">
          {tutorial.audience === 'users' && release ? (
            <a href={release.url} className="btn btn--accent" target="_blank" rel="noopener">
              <Download size={16} /> {t.tutorials.downloadLatest(release.tag)}
            </a>
          ) : null}
          <Link to={to(`/projects/${project.slug}/`)} className="btn btn--ghost">
            {t.tutorials.project}
          </Link>
        </div>
        {tutorial.audience === 'developers' && <p className="guide__norelease">{t.tutorials.noRelease}</p>}
      </header>

      <div className="guide__body">
        <div className="guide__req">
          <h3 className="h4">{t.tutorials.requirements}</h3>
          <ul className="checklist">
            {tutorial.requirements.map((r, i) => (
              <li key={i}>{l(r)}</li>
            ))}
          </ul>
        </div>

        <div className="guide__steps">
          <h3 className="h4">{t.tutorials.steps}</h3>
          <ol className="steps">
            {tutorial.steps.map((s, i) => (
              <li key={i} className="step">
                <span className="step__n" aria-hidden="true">{i + 1}</span>
                <div className="step__content">
                  <h4 className="step__title">{l(s.title)}</h4>
                  <p>{l(s.body)}</p>
                  {s.code?.map((c) => <CodeBlock key={c.label} code={c} />)}
                </div>
              </li>
            ))}
          </ol>

          {tutorial.extra && (
            <>
              <h3 className="h4">{l(tutorial.extra.title)}</h3>
              <dl className="keys">
                {tutorial.extra.rows.map((r) => (
                  <div key={r.key}>
                    <dt><kbd>{r.key}</kbd></dt>
                    <dd>{l(r.value)}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </div>

        <div className="guide__side">
          <h3 className="h4">{t.tutorials.expect}</h3>
          <ul className="guide__expect">
            {tutorial.expect.map((e, i) => (
              <li key={i}>{l(e)}</li>
            ))}
          </ul>
          <h3 className="h4">{t.tutorials.docs}</h3>
          <ul className="linklist">
            {tutorial.docs.map((d) => (
              <li key={d.path}>
                <a href={repoLink(project.slug, d.path)} target="_blank" rel="noopener">
                  {l(d.label)} <External size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Tutorials() {
  const { t } = useI18n();
  const items = tutorials.map((tu) => ({ tu, project: projectBySlug(tu.slug)! }));
  return (
    <div className="page">
      <section className="container page__head">
        <SectionHeader level={1} eyebrow={t.tutorials.eyebrow} title={t.tutorials.title} intro={t.tutorials.intro} />
        <nav aria-label={t.tutorials.jump} className="guide-jump">
          {items.map(({ project }) => (
            <a key={project.slug} href={`#${project.slug}`} className="chip" style={accentStyle(project)}>
              <span className="chip__dot" aria-hidden="true" /> {project.name}
            </a>
          ))}
        </nav>
        <Notice title={t.tutorials.legalTitle}>{t.tutorials.legalBody}</Notice>
      </section>
      <div className="container guides">
        {items.map(({ tu, project }) => (
          <Guide key={tu.slug} tutorial={tu} project={project} />
        ))}
      </div>
    </div>
  );
}
