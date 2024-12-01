'use client';

import CardsFlexCarrusel from '@core/components/CardsFlexCarrusel';
import type { AppsCardType } from '@core/schemas/app-card.schema';
import AppCard from '../AppCard';

interface AppCarruselWrapperProps {
  apps: AppsCardType[];
  viewDetails: string;
  addToCart: string;
}

export default function AppCarruselWrapper({
  apps,
  viewDetails,
  addToCart,
}: AppCarruselWrapperProps) {
  return (
    <CardsFlexCarrusel classNameContainer="max-w-[385px]" items={apps}>
      {(app, i) => (
        <AppCard
          key={`gac-${i}`}
          title={app.title}
          description={app.description}
          price={app.price}
          rating={app.rating}
          reviews={app.reviews}
          textButton={app.platform}
          tags={app.tags}
          imageSrc={app.img}
          imageAlt={app.title}
          emoji="/images/appsheet_logo.png"
          viewDetails={viewDetails}
          addToCart={addToCart}
        />
      )}
    </CardsFlexCarrusel>
  );
}
