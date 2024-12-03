'use client';

import CardsFlexCarousel from '@core/components/CardsFlexCarousel';
import CourseCard from '@core/components/CourseCard';
import type { CourseCardType } from '@core/schemas/course-card.schema';

interface RecommendedCarouselWrapperProps {
  courses: CourseCardType[];
  viewDetails: string;
  addToCart: string;
}

export default function RecommendedCarouselWrapper({
  courses,
  viewDetails,
  addToCart,
}: RecommendedCarouselWrapperProps) {
  return (
    <CardsFlexCarousel items={courses} classNameContainer="pl-6">
      {(item, i) => (
        <CourseCard
          className="!max-h-[530px] !min-h-[530px] !max-w-[475px]"
          key={`gcc-${i}`}
          title={item.title}
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
