import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { getLocale } from 'next-intl/server';
import { routing } from '@core/lib/i18nRouting';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest, _: NextFetchEvent) {
  const _mode = request.nextUrl.searchParams.get('mode');
  const locale = await getLocale();
  const pathname = request.nextUrl.pathname;

  if (pathname.endsWith('/help')) {
    return NextResponse.redirect(new URL(`/${locale}/help/terms-and-conditions`, request.url));
  }
  /*
  const error = request.nextUrl.searchParams.get('error');
  const token = request.cookies.get('auth_token');
  const isAccessingPublicRoute = [`/${locale}/signin`, `/${locale}/signup`].includes(pathname);
  if ((error && !token) || (!token && !isAccessingPublicRoute)) {
    return NextResponse.redirect(new URL(`/${locale}/signin`, request.url));
  }
  if(error && token && !isAccessingPublicRoute) {
    try {
      const [errorStatus, data] = await apiService.post<{ status: boolean }>(
        '/auth/status',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const isInvalidStatus = !!errorStatus || (data !== undefined && !data.status);
      if (isInvalidStatus) {
        return NextResponse.redirect(new URL(`/${locale}/signin`, request.url));
      }
    }catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL(`/${locale}/signin`, request.url));
    }
  }
  if(!error && token  && isAccessingPublicRoute) {
    return NextResponse.redirect(new URL(`/${locale}/platform`, request.url));
  }*/

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|es)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
