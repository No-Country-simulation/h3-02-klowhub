import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { getLocale } from 'next-intl/server';
import { routing } from '@core/lib/i18nRouting';
import { apiService } from '@core/services/api.service';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest, _: NextFetchEvent) {
  const _pathname = request.nextUrl.pathname;
  const _mode = request.nextUrl.searchParams.get('mode');
  const locale = await getLocale();
  const token = request.cookies.get('auth_token');
  //console.log('token', token?.value);

  try {
    const [_error, data] = await apiService.post('/auth/status', {
      headers: `cookie: ${token}`,
    });
    const isvalid = data instanceof Object && 'status' in data;
    console.log('data', data);
    console.log('phaname', _pathname);
    console.log(_error);
    if (
      isvalid &&
      data?.status &&
      (_pathname === `/${locale}/signin` || _pathname === `/${locale}/signup`)
    ) {
      console.log('redir'); //redirect({ href: { pathname: '/platform' }, locale });
      return NextResponse.redirect(new URL('/platform', request.url));
    }
  } catch (error) {
    console.error('Error al validar el token:', error);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|es)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
