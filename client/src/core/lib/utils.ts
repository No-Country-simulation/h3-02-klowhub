import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

//Util para evitar conflictos entre clases, construir classNames condicionales sin conflictos
//twMerge docs: https://github.com/dcastil/tailwind-merge
//clsx docs: https://www.jsdocs.io/package/clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Recuperar Host (Funcional en vercel)
export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};
