'use client';

import CardsFlexCarousel from '@core/components/CardsFlexCarousel';
import type { CourseCardType } from '@core/schemas/course-card.schema';
import CourseCardCreate from './CourseCardCreate';

interface CourseCarouselWraperProps {
  courses: CourseCardType[];
}

export default function CourseCarouselWraperCreator({ courses }: CourseCarouselWraperProps) {
  return (
    <CardsFlexCarousel items={courses}>
      {(item, i) => (
        <CourseCardCreate
          key={`gcc-${i}`}
          title={item.title}
          description={item?.description || ''}
          rating={item.rating}
          reviews={item.reviews}
          platform={item.platform}
          tags={item.tags}
          imageSrc={item.img}
          imageAlt={item.title}
          categoria={item.type}
        />
      )}
    </CardsFlexCarousel>
  );
}
