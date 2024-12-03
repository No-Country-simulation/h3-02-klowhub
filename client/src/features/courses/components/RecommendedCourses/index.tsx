import { getTranslations } from 'next-intl/server';
import CardsFlexContainer from '@core/components/CardsFlexContainer';
import CourseCard from '@core/components/CourseCard';
import type { CourseCardType } from '@core/schemas/course-card.schema';
import { getContent } from '@core/services/getContent';
import RecommendedCarouselWrapper from './RecommendedCarouselWrapper';

export default async function RecommendedCourses() {
  const interestCourses = await getContent<CourseCardType[]>('/json/interest-courses.json');
  const ct = await getTranslations<'Common'>('Common');
  return (
    <aside className="w-full space-y-6 rounded-lg">
      <h2 className="text-lg font-semibold text-white">Cursos que te pueden interesar</h2>
      <CardsFlexContainer items={interestCourses}>
        {(item, i) => (
          <CourseCard
            className="!max-h-[530px] !min-h-[530px] !max-w-[475px] min-[1340px]:!max-h-[515px] min-[1340px]:!min-h-[515px]"
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
      <RecommendedCarouselWrapper
        courses={interestCourses}
        viewDetails={ct('viewDetails')}
        addToCart={ct('addToCart')}
      />
    </aside>
  );
}
