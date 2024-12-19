'use client';

import { useLocalCart } from '@features/cart/hooks/useLocalCart';
import CardCart from '../CardCart';

interface CourseSectionProps {
  deleteText: string;
}

export default function CourseCartList({ deleteText }: CourseSectionProps) {
  const { removeFromCart, stored } = useLocalCart();

  return (
    <div className="flex-1 lg:pr-7">
      {stored && stored.length > 0 ? (
        stored.map((course, index) => (
          <CardCart
            key={index}
            title={course.title}
            imageUrl={course?.imageSrc || ''}
            platform={course.platform}
            sector={''}
            rating={course.rating}
            reviews={course.reviews}
            tags={[]}
            onRemove={() => removeFromCart(course.courseId)}
            deleteText={deleteText}
          />
        ))
      ) : (
        <div className="p-16 text-center text-2xl font-semibold text-white">
          Todavía no tienes elementos agregados al carrito
        </div>
      )}
    </div>
  );
}
