import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@core/lib/i18nRouting';

export default async function CreatorCoursesPage({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations<'NewCourse'>({ locale: locale, namespace: 'NewCourse' });

  return (
    <main className="mt-36 size-full px-10 sm:px-[51px] min-[1800px]:px-16">
      <h1 className="text-lg font-medium text-white">{t('mainTitle')}</h1>
    </main>
  );
}

export async function generateStaticParams() {
  const paths = routing.locales.map(locale => ({
    locale,
    slug: `${locale}/creator/courses/new`,
  }));

  return paths.map(params => ({
    params,
  }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const t = await getTranslations<'NewCourse'>({ locale: locale, namespace: 'NewCourse' });
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
