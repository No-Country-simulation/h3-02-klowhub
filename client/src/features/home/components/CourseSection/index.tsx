import { getTranslations } from 'next-intl/server';
import Button from '@core/components/Button';
import CardsFlexContainer from '@core/components/CardsFlexContainer';
import { Link } from '@core/lib/i18nRouting';
import CourseCard from '@features/courses/components/CourseCard';
import { getRecommendedCourses } from '@features/home/services/getRecommendedCourses';
import CourseCarouselWrapper from './CourseCarouselWrapper';

export default async function CourseSection() {
  const pt = await getTranslations<'Platform'>('Platform');
  const ct = await getTranslations<'Common'>('Common');
  const courses = await getRecommendedCourses();
  const topCourses = courses.slice(0, 3);

  return (
    <section className="mx-auto w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">{pt('courseSectionTitlePlat')}</h2>
        <p className="text-gray-300">{pt('courseSectionDescPlat')}</p>
      </div>
      <CardsFlexContainer items={topCourses}>
        {(item, i) => (
          <CourseCard
            courseId={item?.['_id'] || item?.id}
            key={`gcc-${i}`}
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
            viewDetails={ct('viewDetails')}
            addToCart={ct('addToCart')}
          />
        )}
      </CardsFlexContainer>
      <CourseCarouselWrapper
        viewDetails={ct('viewDetails')}
        addToCart={ct('addToCart')}
        courses={topCourses}
      />
      <div className="mx-auto mt-8 w-full max-w-72">
        <Button variant="outline" asChild size="full" className="py-6">
          <Link href="/courses">{ct('viewMore')}</Link>
        </Button>
      </div>
    </section>
  );
}
