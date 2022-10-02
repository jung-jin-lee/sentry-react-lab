import * as Sentry from '@sentry/react';
import axios, { AxiosError } from 'axios';

export function throwError() {
  throw new Error('throwError: error');
}

export class SentryError extends Error {
  private e: Error;
  constructor(e: Error) {
    super(`${e.message}\n${e.stack ? 'original error stack: ' + e.stack : ''}`);

    this.e = e;

    Error.captureStackTrace(this, this.constructor);

    this.setAxiosContext();
  }

  setAxiosContext() {
    if (!axios.isAxiosError(this.e)) {
      return;
    }

    const ae = this.e as AxiosError;
    const { data, headers, method, params, url } = ae.config;

    Sentry.setContext('Api req', {
      method,
      url,
      headers,
      params,
      body: data,
    });

    if (ae.response) {
      const { data, headers, status } = ae.response;

      Sentry.setContext('Api res', {
        headers,
        status,
        res: data,
      });
    }
  }
}
