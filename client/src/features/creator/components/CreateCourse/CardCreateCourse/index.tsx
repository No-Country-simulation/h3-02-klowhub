import { getTranslations } from 'next-intl/server';
import CardsFlexContainer from '@core/components/CardsFlexContainer';
import type { CourseCardType } from '@core/schemas/course-card.schema';
import { getContent } from '@core/services/getContent';
import CourseCard from '@features/courses/components/CourseCard';
import CourseCarouselWrapperCreator from './CourseCarouselWrapper';

export default async function CardCreateCourse() {
  const courses = await getContent<CourseCardType[]>('/json/recommended-courses.json');
  const t = await getTranslations<'Common'>('Common');
  return (
    <section className="mx-auto w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Cursos Creados</h2>
      </div>
      <CardsFlexContainer items={courses}>
        {(item, i) => (
          <CourseCard
            courseId={item.id}
            addToCart={t('addToCart')}
            viewDetails={t('viewDetails')}
            key={`fcccc-${i}`}
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
      </CardsFlexContainer>
      <CourseCarouselWrapperCreator
        courses={courses}
        addToCart={t('addToCart')}
        viewDetails={t('viewDetails')}
      />
    </section>
  );
}
