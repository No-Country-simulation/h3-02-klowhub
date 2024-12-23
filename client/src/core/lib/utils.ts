import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
//import { APP_URL, VERCEL_ENV, VERCEL_PROJECT_PRODUCTION_URL, VERCEL_URL } from "@root/env.config";
import env from '@root/env.config';

//Util para evitar conflictos entre clases, construir classNames condicionales sin conflictos
//twMerge docs: https://github.com/dcastil/tailwind-merge
//clsx docs: https://www.jsdocs.io/package/clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Recuperar Host (Funcional en vercel)
export const getBaseUrl = () => {
  if (env.APP_URL) {
    return env.APP_URL;
  }

  if (env.VERCEL_ENV === 'production' && env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};
