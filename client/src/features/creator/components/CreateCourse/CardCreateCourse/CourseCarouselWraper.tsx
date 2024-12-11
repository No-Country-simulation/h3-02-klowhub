'use client';

import CardsFlexCarousel from '@core/components/CardsFlexCarousel';
import type { CourseCardType } from '@core/schemas/course-card.schema';
import CourseCard from '@features/courses/components/CourseCard';

interface CourseCarouselWraperProps {
  courses: CourseCardType[];
}

export default function CourseCarouselWraperCreator({ courses }: CourseCarouselWraperProps) {
  return (
    <CardsFlexCarousel items={courses}>
      {(item, i) => (
        <CourseCard
          key={`cccc-${i}`}
          courseId={item.id}
          addToCart=""
          viewDetails=""
          title={item.title}
          description={item?.basicDescription || ''}
          rating={item.rating}
          reviews={item.reviews}
          platform={item.platform}
          tags={item.tags}
          imageSrc={item.imageUrl}
          imageAlt={item.title}
          categoria={item.type}
        />
      )}
    </CardsFlexCarousel>
  );
}
