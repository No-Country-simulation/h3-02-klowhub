'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { cn } from '@core/lib/utils';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '../Carrusel';

interface CardsFlexCarouselProps<T> {
  children: (item: T, i: number, isDragging: boolean) => ReactNode;
  className?: string;
  classNameContainer?: string;
  classNmaeButtons?: string;
  items: T[];
}

export default function CardsFlexCarousel<T>({
  className = '',
  classNameContainer = '',
  classNmaeButtons = '',
  items = [],
  children,
}: CardsFlexCarouselProps<T>) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isDragging, _] = useState(false);

  useEffect(() => {
    if (!api) {
      return () => {};
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <>
      <div className={cn('relative min-[1240px]:hidden', className)}>
        <Carousel className="overflow-hidden" setApi={setApi}>
          <CarouselContent className="-ml-6 flex">
            {items?.map((item, i) => (
              <CarouselItem
                className={cn('w-full min-w-[350px] max-w-[450px]', classNameContainer)}
                data-carousel-item="true"
                key={i}>
                {children(item, i, isDragging)}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div
        className={cn(
          'mt-6 inline-flex w-full items-center justify-center gap-2 min-[1240px]:hidden',
          classNmaeButtons
        )}>
        {Array.from({ length: items?.length || 0 }).map((_, index) => (
          <button
            key={`csb-${index}`}
            className={`size-[.65rem] rounded-full transition-colors ${
              index === current ? 'bg-white' : 'bg-white/30'
            }`}
            onClick={() => api?.scrollTo(index)}></button>
        ))}
      </div>
    </>
  );
}
