/* eslint-disable import/order */
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '@styles/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { type ReactNode, Suspense } from 'react';
import { inter } from '@styles/font';
import { routing } from '@core/lib/i18nRouting';
import { cn, getBaseUrl } from '@core/lib/utils';
import Loading from './loading';

export const viewport: Viewport = {
  width: 'device-width',
  minimumScale: 1,
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  robots: 'index, follow',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
  openGraph: {
    url: `${getBaseUrl()}/`,
    type: 'website',
  },
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  //Si llega un locale no identificado redirige hacia notFound
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  //Setea el locale en la request
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={cn(inter.className, inter.variable)} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
