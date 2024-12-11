const isProduction = import.meta.env.MODE === 'production';

export const API_URL = isProduction
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;

export const INTERACTIONS_URL = isProduction
    ? import.meta.env.VITE_INTERACTIONS_URL_PROD
    : import.meta.env.VITE_INTERACTIONS_URL_PROD; // En desarrollo, usa la misma que API_URL por defecto