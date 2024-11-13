import type { NextFetchEvent, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/core/lib/i18nRouting';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest, _: NextFetchEvent) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|es)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
