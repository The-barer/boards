const APP_DEV_MODE: boolean = import.meta.env.APP_DEV_MODE;

const APP_HOST =
  (APP_DEV_MODE && import.meta.env.VITE_APP_DEV_HOST) ||
  import.meta.env.VITE_APP_HOST;

const API_ENDPOINT =
  (APP_DEV_MODE && import.meta.env.VITE_API_DEV_ENDPOINT) ||
  import.meta.env.VITE_API_ENDPOINT;

const AUTH_REDIRECT_URL = `${APP_HOST}/auth/callback`;

export const config = {
  APP_HOST,
  API_ENDPOINT,
  AUTH_REDIRECT_URL,
} as const;
