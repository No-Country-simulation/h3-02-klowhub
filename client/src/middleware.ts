import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { getLocale } from 'next-intl/server';
import { routing } from '@core/lib/i18nRouting';
import { apiService } from '@core/services/api.service';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest, _: NextFetchEvent) {
  const _pathname = request.nextUrl.pathname;
  const _mode = request.nextUrl.searchParams.get('mode');
  const error = request.nextUrl.searchParams.get('error');
  const locale = await getLocale();
  const token = request.cookies.get('auth_token');

  if (!!error) {
    const [_error, data] = await apiService.post('/auth/status', {
      headers: `cookie: ${token}`,
    });

    const isvalid = data instanceof Object && 'status' in data;

    if (
      isvalid &&
      data?.status &&
      (_pathname === `/${locale}/signin` || _pathname === `/${locale}/signup`)
    ) {
      //redirect({ href: { pathname: '/platform' }, locale });
      return NextResponse.redirect(new URL('/platform', request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|es)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
