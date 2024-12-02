import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@core/lib/i18nRouting';
import WatchCourseDetailSection from '@features/courses/components/WatchCourseDetailSection';
import WatchCourseSection from '@features/courses/components/WatchCourseSection';

export default async function CoursesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; id: string | number }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale, id } = await params;
  const { lessonActive = '', moduleActive = '' } = await searchParams;
  setRequestLocale(locale);
  return (
    <main className="mb-20 mt-36 size-full space-y-8 px-10 sm:px-[51px] min-[1800px]:px-16">
      <WatchCourseSection
        moduleActive={moduleActive as string}
        lessonActive={lessonActive as string}
        courseId={id}
      />
      <div className="flex w-full justify-between gap-x-20">
        <WatchCourseDetailSection />
        <aside className="w-full min-w-[380px] flex-1 basis-[27%] rounded-lg bg-white/10 shadow-app-1">
          <h2 className="px-4 py-6 text-base font-semibold text-white">
            Cursos que te pueden interesar
          </h2>
        </aside>
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
