import { type NextFetchEvent, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { getLocale } from 'next-intl/server';
import { redirect, routing } from '@core/lib/i18nRouting';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest, _: NextFetchEvent) {
  const _pathname = request.nextUrl.pathname;
  const _mode = request.nextUrl.searchParams.get('mode');
  const locale = await getLocale();
  const token = request.cookies.get('auth_token');
  console.log('token', token);

  try {
    const validationResponse = await fetch('http://localhost:3000/auth/status', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (validationResponse && (_pathname === '/signin' || _pathname === '/signup')) {
      redirect({ href: { pathname: '/platform' }, locale });
    }
  } catch (error) {
    console.error('Error al validar el token:', error);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|es)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
