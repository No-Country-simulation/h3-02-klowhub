'use server';

import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';
import { redirect } from '@core/lib/i18nRouting';

export async function signOut() {
  const locale = await getLocale();
  try {
    const cookie = await cookies();
    cookie.delete('auth_token');
  } catch (error) {
    console.error(error);
  }

  redirect({ href: { pathname: '/signin' }, locale });
}
