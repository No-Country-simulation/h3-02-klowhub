import { getTranslations, setRequestLocale } from 'next-intl/server';
import ComingSoon from '@core/components/ComingSoon';
import { routing } from '@core/lib/i18nRouting';

export default async function MentorsPage({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const ct = await getTranslations<'ComingSoon'>({
    locale: locale,
    namespace: 'ComingSoon',
  });
  setRequestLocale(locale);
  return (
    <main className="mb-20 mt-36 size-full px-10 sm:px-[51px] min-[1800px]:px-16">
      <ComingSoon className="self-center" title={ct('title')} subTitle={ct('subTitle')} />
    </main>
  );
}

export async function generateStaticParams() {
  const paths = routing.locales.map(locale => ({
    locale,
    slug: `${locale}/mentors`,
  }));

  return paths.map(params => ({
    params,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations<'Mentors'>({ locale: locale, namespace: 'Mentors' });
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
