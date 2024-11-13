import { getRequestConfig } from 'next-intl/server';
import { routing } from './i18nRouting';
//import { getUserLocale } from './i18nUser';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestLocaleSend = await requestLocale;
  let locale = requestLocaleSend ?? '';
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
  };
});
