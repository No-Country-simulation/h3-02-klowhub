import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@root/src/core/lib/i18nRouting';
import BannerCta from '@root/src/features/home/components/Banner';
import { CourseSection } from '@root/src/features/home/components/CourseSection/CourseSection';
import SectionIquiris from '@root/src/features/home/components/SectionIquiris/SectionIquiris';

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

export default async function PlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations<'Banner'>({ locale: locale, namespace: 'Banner' });
  return (
    <main className="mt-36 size-full px-10 sm:px-[51px] min-[1800px]:px-16">
      <CourseSection />
      <SectionIquiris />
      <BannerCta
        title={t('connectWithExperts')}
        description={t('learnFromTheBest')}
        imageSrc="/images/klowhub_banner.png"
      />
    </main>
  );
}
