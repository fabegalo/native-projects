// Used only at build time (scripts/prerender.mjs) to render each route to
// static HTML. Never shipped to the browser.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';
import { allRoutes, headFor } from './seo';

export { allRoutes, headFor };

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={`/native-projects${url}`} basename="/native-projects" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
