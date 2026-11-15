import { useState } from 'react';
import type { Project, Video } from '../data/projects';
import { useI18n } from '../i18n/context';
import { YOUTUBE_CHANNEL } from '../lib/site';
import { External } from './Icons';
import { asset } from './ui';

/**
 * Click-to-load YouTube embed. Until the visitor presses play, only a
 * self-hosted thumbnail is shown: no request reaches YouTube, which keeps the
 * page fast and private. The player itself uses youtube-nocookie.com.
 */
function VideoCard({ project, video }: { project: Project; video: Video }) {
  const { t, l, date } = useI18n();
  const [playing, setPlaying] = useState(false);
  const title = l(video.title);
  const thumb = (suffix = '') => asset(`media/${project.slug}/video-${video.id}${suffix}.webp`);

  return (
    <li className="video">
      <div className="video__frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video__poster" onClick={() => setPlaying(true)} aria-label={t.project.play(title)}>
            <img
              src={thumb('-640')}
              srcSet={`${thumb('-640')} 640w, ${thumb()} 1280w`}
              sizes="(min-width: 900px) 560px, 100vw"
              width={1280}
              height={720}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <span className="video__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            </span>
            <span className="video__duration">{video.duration}</span>
          </button>
        )}
      </div>
      <div className="video__meta">
        <p className="video__title">{title}</p>
        <p className="gallery__caption">
          <time dateTime={video.date}>{date(video.date)}</time> · {l(video.caption)}
        </p>
        <a className="link-arrow video__link" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener">
          {t.project.watchOnYouTube} <External size={14} />
        </a>
      </div>
    </li>
  );
}

export function Videos({ project }: { project: Project }) {
  const { t } = useI18n();
  return (
    <>
      <ul className="videos">
        {project.videos.map((v) => (
          <VideoCard key={v.id} project={project} video={v} />
        ))}
      </ul>
      <a className="link-arrow" href={YOUTUBE_CHANNEL} target="_blank" rel="noopener">
        {t.project.channel} <External size={14} />
      </a>
    </>
  );
}
