'use client';

import CardsFlexCarrusel from '@core/components/CardsFlexCarrusel';
import type { CourseCardType } from '@core/schemas/course-card.schema';
import CourseCard from '../CourseCard';

interface CourseCarruselWraperProps {
  courses: CourseCardType[];
  viewDetails: string;
  addToCart: string;
}

export default function CourseCarruselWraper({
  courses,
  viewDetails,
  addToCart,
}: CourseCarruselWraperProps) {
  return (
    <CardsFlexCarrusel items={courses}>
      {(item, i) => (
        <CourseCard
          key={`gcc-${i}`}
          title={item.title}
          description={item.description || ''}
          price={item.price}
          rating={item.rating}
          reviews={item.reviews}
          textButton={item.platform}
          tags={item.tags}
          imageSrc={item.img}
          imageAlt={item.title}
          emoji="/images/appsheet_logo.png"
          categoria={item.type}
          viewDetails={viewDetails}
          addToCart={addToCart}
        />
      )}
    </CardsFlexCarrusel>
  );
}
