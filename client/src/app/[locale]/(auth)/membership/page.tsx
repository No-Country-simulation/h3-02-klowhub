import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@core/lib/i18nRouting';

export async function generateStaticParams() {
  const paths = routing.locales.map(locale => ({
    locale,
    slug: `${locale}/membership`,
  }));

  return paths.map(params => ({
    params,
  }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const t = await getTranslations<'Membership'>({ locale: locale, namespace: 'Membership' });
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

export default async function MembershipPage({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <main className="mb-20 mt-36 size-full px-10 sm:px-[51px] min-[1800px]:px-16"></main>;
}
