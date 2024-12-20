'use client';

import CardsFlexCarousel from '@core/components/CardsFlexCarousel';
import type { CourseCardType } from '@core/schemas/course-card.schema';
import CourseCard from '@features/courses/components/CourseCard';

interface CourseCarouselWrapperProps {
  courses: CourseCardType[];
  viewDetails: string;
  addToCart: string;
}

export default function CourseCarouselWrapper({
  courses,
  viewDetails,
  addToCart,
}: CourseCarouselWrapperProps) {
  return (
    <CardsFlexCarousel items={courses}>
      {(item, i, isDragging) => (
        <CourseCard
          key={`gcc-${i}`}
          eventsNone={isDragging}
          courseId={item?.['_id'] || item?.id}
          title={item.title}
          description={item?.basicDescription || ''}
          price={item.price}
          rating={item.rating}
          reviews={item.reviews}
          platform={item.platform}
          tags={item.tags}
          imageSrc={item.imageUrl || '/images/mocks/course_mock1.png'}
          imageAlt={item.title}
          categoria={item.type}
          viewDetails={viewDetails}
          addToCart={addToCart}
        />
      )}
    </CardsFlexCarousel>
  );
}
