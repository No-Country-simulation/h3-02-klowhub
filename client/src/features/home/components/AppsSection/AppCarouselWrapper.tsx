'use client';

import CardsFlexCarousel from '@core/components/CardsFlexCarousel';
import type { AppsCardType } from '@core/schemas/app-card.schema';
import AppCard from '../../../apps/components/AppCard';

interface AppCarouselWrapperProps {
  apps: AppsCardType[];
  viewDetails: string;
  addToCart: string;
}

export default function AppCarouselWrapper({
  apps,
  viewDetails,
  addToCart,
}: AppCarouselWrapperProps) {
  return (
    <CardsFlexCarousel classNameContainer="max-w-[385px]" items={apps}>
      {(app, i) => (
        <AppCard
          key={`gac-${i}`}
          title={app.title}
          description={app?.description || ''}
          price={app.price}
          rating={app.rating}
          reviews={app.reviews}
          platform={app.platform}
          tags={app.tags}
          imageSrc={app.imageUrl}
          imageAlt={app.title}
          viewDetails={viewDetails}
          addToCart={addToCart}
        />
      )}
    </CardsFlexCarousel>
  );
}
