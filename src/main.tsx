import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import App from './App';
import './index.css';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // release: 'test',// use if needed
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
