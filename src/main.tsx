import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/fonts';
import './styles/global.css';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
const app = (
  <StrictMode>
    <BrowserRouter basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const root = document.getElementById('root')!;
// Prerendered pages are hydrated; the dev server and the 404 fallback render fresh.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
