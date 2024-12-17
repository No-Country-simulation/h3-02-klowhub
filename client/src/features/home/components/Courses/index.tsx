import { getTranslations } from 'next-intl/server';
import CardsFlexContainer from '@core/components/CardsFlexContainer';
import CourseHorizontalCard from '@features/courses/components/CourseHorizontalCard';
import { getRecommendedCourses } from '@features/home/services/getRecommendedCourses';
import { SearchBar } from './SearchBar';

export default async function CoursesListSection() {
  const t = await getTranslations<'Common'>('Common');
  const courses = await getRecommendedCourses();
  console.log('courses', courses);
  return (
    <div className="w-full text-white">
      <SearchBar filter={t('filter')} sortBy={t('sort')} search={t('search')} />
      <CardsFlexContainer className="flex flex-col" items={courses}>
        {(item, i) => (
          <CourseHorizontalCard
            key={`gcc-${i}`}
            title={item.title}
            emoji="/images/appsheet_logo.png"
            description={item?.basicDescription || ''}
            rating={item.rating}
            reviews={item.reviews}
            textButton={item.platform}
            tags={['CRM', 'Clientes', 'Ventas']}
            imageUrl={item.imageUrl || '/images/mocks/course_mock1.png'}
            categoria={item.type}
            viewDetails={t('viewDetails')}
          />
        )}
      </CardsFlexContainer>
    </div>
  );
}
