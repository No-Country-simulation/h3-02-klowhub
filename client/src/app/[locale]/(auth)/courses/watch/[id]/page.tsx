import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@core/lib/i18nRouting';
import RecommendedCourses from '@features/courses/components/RecommendedCourses';
import WatchCourseDetailSection from '@features/courses/components/WatchCourseDetailSection';
import WatchCourseSection from '@features/courses/components/WatchCourseSection';

export default async function CoursesPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  const { locale, id } = await params;
  const { lessonActive = '', moduleActive = '' } = await searchParams;
  setRequestLocale(locale);
  return (
    <main className="mb-20 mt-36 size-full space-y-8 px-0 min-[780px]:px-10 min-[1800px]:px-16">
      <WatchCourseSection
        moduleActive={moduleActive as string}
        lessonActive={lessonActive as string}
        courseId={id}
      />
      <div className="mb-5 flex w-full flex-col justify-between space-y-8 px-[3%] min-[780px]:px-0">
        <WatchCourseDetailSection />
        <RecommendedCourses />
      </div>
    </main>
  );
}

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
