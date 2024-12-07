import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@core/lib/i18nRouting';
import CourseDetails from '@features/courses/components/CourseDetails';

export async function generateStaticParams() {
  const paths = routing.locales.map(locale => ({
    locale,
  }));

  return paths.map(params => ({
    params,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations<'CourseDetail'>({ locale: locale, namespace: 'CourseDetail' });
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

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="mt-36 size-full px-10 sm:px-[51px] min-[1800px]:px-16">
      <CourseDetails />
    </main>
  );
}
