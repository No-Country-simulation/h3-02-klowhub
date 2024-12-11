'use client';

import CardsFlexCarousel from '../CardsFlexCarousel';
import CardsFlexContainer from '../CardsFlexContainer';

interface CardSectionLoaderProps {
  itemsCount?: number;
}

export default function CardSectionLoader({ itemsCount = 3 }: CardSectionLoaderProps) {
  return (
    <div className="flex flex-col space-y-4 text-white">
      <div className="h-[200px] w-[40px] animate-pulse rounded-lg bg-white/15 transition-all ease-in-out"></div>
      <div className="mb-6 h-[200px] w-full animate-pulse rounded-lg bg-white/15 transition-all ease-in-out"></div>

      <CardsFlexContainer items={Array.from({ length: itemsCount }, (_, i) => `${i + 1}`)}>
        {(item, i) => (
          <div
            key={`skc-${item}`}
            className="size-full max-h-[500px] min-h-[500px] max-w-[550px] animate-pulse rounded-lg bg-white/15 transition-all ease-in-out"></div>
        )}
      </CardsFlexContainer>

      <CardsFlexCarousel items={Array.from({ length: itemsCount }, (_, i) => `${i + 1}`)}>
        {(item, i) => (
          <div
            key={`skc-${item}`}
            className="size-full max-h-[500px] min-h-[500px] max-w-[550px] animate-pulse rounded-lg bg-white/15 transition-all ease-in-out"></div>
        )}
      </CardsFlexCarousel>
    </div>
  );
}
