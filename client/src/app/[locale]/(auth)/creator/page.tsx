import { getTranslations, setRequestLocale } from 'next-intl/server';
import BannerCta from '@core/components/Banner';
import { routing } from '@core/lib/i18nRouting';
import banner from '/public/images/appsheet_particles.png';
import ContentSection from '@features/creator/components/ContentSection/Index';
import NavigatorSection from '@features/creator/components/NavigatorSection/Index';
import RecommendProjectSection from '@features/creator/components/RecommendProjectSection/Index';

export async function generateStaticParams() {
  const paths = routing.locales.map(locale => ({
    locale,
    slug: `${locale}/creator`,
  }));

  return paths.map(params => ({
    params,
  }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const t = await getTranslations<'Creator'>({ locale: locale, namespace: 'Creator' });
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

export default async function CreatorPage({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations<'Creator'>({ locale: locale, namespace: 'Creator' });
  return (
    <main className="mb-20 mt-36 size-full space-y-11 px-10 sm:px-[51px] min-[1800px]:px-16">
      <BannerCta
        title="Klowhub"
        description={t('bannerSubtitle')}
        imageSrc={banner}
        type="creator"
      />
      <NavigatorSection />
      <ContentSection />
      <RecommendProjectSection />
    </main>
  );
}
