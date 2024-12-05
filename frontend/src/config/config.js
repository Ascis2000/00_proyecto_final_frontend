const isProduction = import.meta.env.MODE === 'production';

export const API_URL = isProduction
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;