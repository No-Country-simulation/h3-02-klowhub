import { getTranslations, setRequestLocale } from 'next-intl/server';
import BannerCta from '@core/components/Banner';
import { routing } from '@core/lib/i18nRouting.ts';
import AppSection from '@features/home/components/AppsSection';
import CourseSection from '@features/home/components/CourseSection';
import MentorSection from '@features/home/components/MentorSection';
import SectionIquiris from '@features/home/components/SectionIquiris';

export default async function PlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations<'Platform'>({ locale: locale, namespace: 'Platform' });
  return (
    <main className="mb-20 mt-36 size-full space-y-12 px-10 sm:px-[51px] min-[1800px]:px-16">
      <h1 className="sr-only">{t('mainTitle')}</h1>
      <CourseSection />
      <AppSection />
      <SectionIquiris />
      <BannerCta
        title={t('connectWithExperts')}
        description={t('learnFromTheBest')}
        imageSrc="/images/klowhub_banner.png"
      />
      <MentorSection />
    </main>
  );
}

export async function generateStaticParams() {
  const paths = routing.locales.map(locale => ({
    locale,
    slug: `${locale}/platform`,
  }));

  return paths.map(params => ({
    params,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations<'Platform'>({ locale: locale, namespace: 'Platform' });
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
