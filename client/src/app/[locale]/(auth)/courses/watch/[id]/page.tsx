import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@root/src/core/lib/i18nRouting';
import WatchCourseSection from '@root/src/features/courses/components/WatchCourseSection/Index';

export async function generateStaticParams({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const paths = routing.locales.map(locale => ({
    locale,
    slug: `${locale}/courses/watch/${id}`,
  }));

  return paths.map(params => ({
    params,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations<'CoursesWatch'>({ locale: locale, namespace: 'CoursesWatch' });
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

export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="mt-8 size-full px-10 sm:px-[51px] min-[1800px]:px-16">
      <WatchCourseSection />
    </main>
  );
}
