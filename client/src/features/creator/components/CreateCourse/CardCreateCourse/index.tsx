import CardsFlexContainer from '@core/components/CardsFlexContainer';
import { getRecommendedCourses } from '@features/home/services/getRecommendedCourses';
import CourseCardCreate from './CourseCardCreate';
import CourseCarouselWraperCreator from './CourseCarouselWraper';

export default async function CardCreateCourse() {
  const courses = await getRecommendedCourses();
  return (
    <section className="mx-auto w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Cursos Creados</h2>
      </div>
      <CardsFlexContainer items={courses}>
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
      </CardsFlexContainer>
      <CourseCarouselWraperCreator courses={courses} />
    </section>
  );
}
