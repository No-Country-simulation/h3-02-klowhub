import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { AppConfig } from './appConfig';

export const routing = defineRouting(AppConfig);

export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
//i18n: https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing
const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

export { Link, redirect, usePathname, useRouter };
