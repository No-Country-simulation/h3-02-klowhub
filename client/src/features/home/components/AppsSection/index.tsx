import { getTranslations } from 'next-intl/server';
import Button from '@core/components/Button';
import CardsFlexContainer from '@core/components/CardsFlexContainer';
import { Link } from '@core/lib/i18nRouting';
import AppCard from '@features/apps/components/AppCard';
import { getRecommendedApps } from '@features/home/services/getRecommendedApps';
import AppCarouselWrapper from './AppCarouselWrapper';

export default async function AppSection() {
  const t = await getTranslations('AppCard');
  const ct = await getTranslations<'Common'>('Common');
  const apps = await getRecommendedApps();
  return (
    <section className="mx-auto w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">{t('titulo')}</h2>
        <p className="text-gray-300">{t('desc')}</p>
      </div>
      <CardsFlexContainer items={apps}>
        {(item, i) => (
          <AppCard
            key={`gca-${i}`}
            title={item.title}
            description={item?.description || ''}
            price={item.price}
            rating={item.rating}
            reviews={item.reviews}
            platform={item.platform}
            tags={item.tags}
            imageSrc={item.imageUrl}
            imageAlt={item.title}
            viewDetails={ct('viewDetails')}
            addToCart={ct('addToCart')}
          />
        )}
      </CardsFlexContainer>
      <AppCarouselWrapper apps={apps} viewDetails={ct('viewDetails')} addToCart={ct('addToCart')} />
      <div className="mx-auto mt-8 w-full max-w-72">
        <Button variant="outline" asChild size="full" className="py-6">
          <Link href="/appstore">{ct('viewMore')}</Link>
        </Button>
      </div>
    </section>
  );
}
