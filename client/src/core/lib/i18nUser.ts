'use server';

import { cookies } from 'next/headers';

// En este caso se guarda en Cookies
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const cookieHandler = await cookies();
  return cookieHandler.get(COOKIE_NAME)?.value;
}

export async function setUserLocale(locale: string) {
  const cookieHandler = await cookies();
  cookieHandler.set(COOKIE_NAME, locale);
}
