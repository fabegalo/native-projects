import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';

export function NotFound() {
  const { t, to } = useI18n();
  return (
    <section className="container page notfound" aria-labelledby="nf-title">
      <p className="notfound__code" aria-hidden="true">404</p>
      <h1 id="nf-title" className="section-title">{t.notFound.title}</h1>
      <p className="section-intro">{t.notFound.body}</p>
      <Link to={to('/')} className="btn btn--primary">{t.notFound.home}</Link>
    </section>
  );
}
