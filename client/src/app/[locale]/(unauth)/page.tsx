import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'Root' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      siteName: t('metaSiteName'),
      title: t('metaTitle'),
      description: t('metaDescription'),
      locale: locale,
    },
  };
}
//Pagina Home/About principal
export default async function App({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Root');

  return (
    <div
      data-testid="root-page"
      className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="bg-grid-white"></div>
      </div>

      <div className="bg-radial-shadow-circle relative z-10 flex min-h-screen w-fit flex-col items-center justify-center">
        <main className="px-4 text-center">
          <h1 className="relative z-20 mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-7xl font-bold text-transparent">
            {t('title')}
          </h1>
          <p className="relative z-20 text-2xl text-gray-400">{t('subTitle')}</p>
        </main>
      </div>

      <footer className="container relative z-10 mx-auto py-6 text-center text-gray-400">
        <small>&copy; {t('development', { name: 'MM' })}</small>
      </footer>
    </div>
  );
}
