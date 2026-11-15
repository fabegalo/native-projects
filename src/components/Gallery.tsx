import { useCallback, useEffect, useRef, useState } from 'react';
import { mediaFor, type Project } from '../data/projects';
import { useI18n } from '../i18n/context';
import { ArrowLeft, ArrowRight, Close, Expand } from './Icons';
import { asset } from './ui';

/**
 * Grid of real captures with an accessible lightbox built on <dialog>
 * (focus trapping, Esc to close and focus return come from the platform).
 * Arrow keys move between images.
 */
export function Gallery({ project }: { project: Project }) {
  const { t, l } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const shots = project.shots;
  const media = mediaFor(project.slug).shots;

  const open = (i: number, btn: HTMLButtonElement) => {
    opener.current = btn;
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => {
      setIndex(null);
      opener.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    el.addEventListener('close', onClose);
    el.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('close', onClose);
      el.removeEventListener('keydown', onKey);
    };
  }, [step]);

  const kindLabel = (k: string) => (k === 'local-recreation' ? t.project.localRecreation : t.project.capture);
  const current = index !== null ? shots[index] : null;

  return (
    <>
      <ul className="gallery">
        {shots.map((s, i) => {
          const m = media[s.id];
          return (
            <li key={s.id} className={`gallery__item gallery__item--${s.kind}`}>
              <button type="button" className="gallery__btn" onClick={(e) => open(i, e.currentTarget)} aria-label={t.a11y.openImage(l(s.title))}>
                <img
                  src={asset(`media/${project.slug}/${s.id}-640.webp`)}
                  width={640}
                  height={Math.round((m.height * 640) / m.width)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span className="gallery__zoom" aria-hidden="true"><Expand size={18} /></span>
              </button>
              <div className="gallery__meta">
                <span className={`tag tag--${s.kind}`}>{kindLabel(s.kind)}</span>
                <p className="gallery__title">{l(s.title)}</p>
                <p className="gallery__caption">{l(s.caption)}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <dialog ref={dialog} className="lightbox" aria-label={current ? l(current.title) : undefined} onClick={(e) => e.target === dialog.current && close()}>
        {current && index !== null && (
          <figure className="lightbox__figure">
            <img
              src={asset(`media/${project.slug}/${current.id}.webp`)}
              width={media[current.id].width}
              height={media[current.id].height}
              alt={`${l(current.title)}. ${l(current.caption)}`}
            />
            <figcaption>
              <span className={`tag tag--${current.kind}`}>{kindLabel(current.kind)}</span>
              <strong>{l(current.title)}</strong> — {l(current.caption)}
              <span className="lightbox__count">{t.a11y.imageOf(index + 1, shots.length)}</span>
            </figcaption>
          </figure>
        )}
        <div className="lightbox__controls">
          {shots.length > 1 && (
            <>
              <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label={t.a11y.previous}>
                <ArrowLeft size={20} />
              </button>
              <button type="button" className="icon-btn" onClick={() => step(1)} aria-label={t.a11y.next}>
                <ArrowRight size={20} />
              </button>
            </>
          )}
          <button type="button" className="icon-btn" onClick={close} aria-label={t.a11y.close} autoFocus>
            <Close size={20} />
          </button>
        </div>
      </dialog>
    </>
  );
}
