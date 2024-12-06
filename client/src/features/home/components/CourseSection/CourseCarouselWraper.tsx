'use client';

import CardsFlexCarousel from '@core/components/CardsFlexCarousel';
import type { CourseCardType } from '@core/schemas/course-card.schema';
import CourseCard from '@features/courses/components/CourseCard';

interface CourseCarouselWraperProps {
  courses: CourseCardType[];
  viewDetails: string;
  addToCart: string;
}

export default function CourseCarouselWraper({
  courses,
  viewDetails,
  addToCart,
}: CourseCarouselWraperProps) {
  return (
    <CardsFlexCarousel items={courses}>
      {(item, i) => (
        <CourseCard
          key={`gcc-${i}`}
          title={item.title}
          description={item?.description || ''}
          price={item.price}
          rating={item.rating}
          reviews={item.reviews}
          platform={item.platform}
          tags={item.tags}
          imageSrc={item.img}
          imageAlt={item.title}
          categoria={item.type}
          viewDetails={viewDetails}
          addToCart={addToCart}
        />
      )}
    </CardsFlexCarousel>
  );
}
