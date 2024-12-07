import { getTranslations, setRequestLocale } from 'next-intl/server';
import ComingSoon from '@core/components/ComingSoon';
import { routing } from '@core/lib/i18nRouting';

export default async function TemsAndConditionsPage({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations<'AdvertisingPolicy'>({
    locale: locale,
    namespace: 'AdvertisingPolicy',
  });
  const ct = await getTranslations<'ComingSoon'>({
    locale: locale,
    namespace: 'ComingSoon',
  });
  return (
    <main className="size-full min-h-dvh px-10 sm:px-[51px] min-[1800px]:px-16">
      <div className="mx-auto mt-8 flex h-[90dvh] min-h-[500px] w-full max-w-[1248px] flex-col items-center justify-start rounded-lg bg-neutral-100 p-6 text-white shadow-app-1">
        <h1 className="w-full text-left text-xl font-bold text-white">{t('mainTitle')}</h1>
        <div className="inline-flex flex-1 basis-full justify-self-center">
          <ComingSoon className="self-center" title={ct('title')} subTitle={ct('subTitle')} />
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const paths = routing.locales.map(locale => ({
    locale,
    slug: `${locale}/help/advertensing-policy`,
  }));

  return paths.map(params => ({
    params,
  }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const t = await getTranslations<'AdvertisingPolicy'>({
    locale: locale,
    namespace: 'AdvertisingPolicy',
  });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      siteName: t('metaSiteName'),
      title: t('metaSiteName'),
      description: t('metaDescription'),
      locale: locale,
    },
  };
}
