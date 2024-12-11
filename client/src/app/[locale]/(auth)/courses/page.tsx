import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@core/lib/i18nRouting';
import CoursesListSection from '@features/home/components/Courses';
import { Breadcrumb } from '@features/home/components/Courses/Breadcrumb';

export default async function CoursesPage({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const breadcrumbItems = [
    { label: 'Home', href: '/es/platform' },
    { label: 'Cursos y lecciones', href: '/courses' },
  ];
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations<'Courses'>({ locale: locale, namespace: 'Courses' });
  return (
    <main className="mb-20 mt-36 size-full px-10 sm:px-[51px] min-[1800px]:px-16">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="mb-4 text-lg font-bold text-white">{t('pageTitle')}</h1>
      <CoursesListSection locale={locale} />
    </main>
  );
}

export async function generateStaticParams() {
  const paths = routing.locales.map(locale => ({
    locale,
    slug: `${locale}/courses`,
  }));

  return paths.map(params => ({
    params,
  }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const t = await getTranslations<'Courses'>({ locale: locale, namespace: 'Courses' });
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
