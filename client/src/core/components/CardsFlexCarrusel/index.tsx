'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { cn } from '@core/lib/utils';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '../Carrusel';

interface CardsFlexCarruselProps<T> {
  children: (item: T, i: number) => ReactNode;
  className?: string;
  classNameContainer?: string;
  items: T[];
}

export default function CardsFlexCarrusel<T>({
  className = '',
  classNameContainer = '',
  items,
  children,
}: CardsFlexCarruselProps<T>) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [_count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return () => {};
    }

    setCount(api.scrollSnapList().length);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div className={cn('relative min-[1240px]:hidden', className)}>
      <Carousel className="overflow-hidden" setApi={setApi}>
        <CarouselContent className="-ml-6 flex">
          {items.map((item, i) => (
            <CarouselItem
              className={cn('w-full min-w-[350px] max-w-[450px]', classNameContainer)}
              key={i}>
              {children(item, i)}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: items.length }).map((_, index) => (
          <button
            key={`csb-${index}`}
            className={`size-2 rounded-full transition-colors ${
              index === current ? 'bg-white' : 'bg-white/30'
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
