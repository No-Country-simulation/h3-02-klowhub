import { getTranslations } from 'next-intl/server';
import CardsFlexContainer from '@core/components/CardsFlexContainer';
import type { CourseCardType } from '@core/schemas/course-card.schema';
import { getContent } from '@core/services/getContent';
import CourseCard from '@features/home/components/CourseCard';

export default async function RecommendedCourses() {
  const interestCourses = await getContent<CourseCardType[]>('/json/interest-courses.json');
  const ct = await getTranslations<'Common'>('Common');
  return (
    <aside className="w-full space-y-6 rounded-lg">
      <h2 className="text-lg font-semibold text-white">Cursos que te pueden interesar</h2>
      <CardsFlexContainer items={interestCourses}>
        {(item, i) => (
          <CourseCard
            className="!max-h-[515px] !min-h-[515px] !max-w-[475px]"
            key={`gcc-${i}`}
            title={item.title}
            rating={item.rating}
            reviews={item.reviews}
            platform={item.platform}
            tags={item.tags}
            imageSrc={item.img}
            imageAlt={item.title}
            categoria={item.type}
            viewDetails={ct('viewDetails')}
            addToCart={ct('addToCart')}
          />
        )}
      </CardsFlexContainer>
    </aside>
  );
}
