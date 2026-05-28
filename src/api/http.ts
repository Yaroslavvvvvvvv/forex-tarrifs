import axios from 'axios';
import { router } from '@/router';

declare module 'axios' {
  interface AxiosRequestConfig {
    /** Skip the global 404/500 redirect and handle the error locally. */
    silent?: boolean;
  }
}

// In dev, "/api" is proxied to the real host by Vite (see vite.config.ts).
// In prod, configure the same redirect in netlify.toml. Override via VITE_API_URL.
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: {
    Accept: 'application/json',
  },
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error?.config?.silent) {
      const status = error?.response?.status;
      if (status === 500) router.navigate('/server-error');
      else if (status === 404) router.navigate('/page-not-found');
    }
    return Promise.reject(error);
  },
);
