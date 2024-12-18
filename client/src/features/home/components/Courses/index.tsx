import { getTranslations } from 'next-intl/server';
import { getRecommendedCourses } from '@features/home/services/getRecommendedCourses';
import CourseListWrapper from './CourseListWrapper';
import { SearchBar } from './SearchBar';

export default async function CoursesListSection() {
  const t = await getTranslations<'Common'>('Common');
  const courses = await getRecommendedCourses();
  return (
    <div className="w-full text-white">
      <SearchBar filter={t('filter')} sortBy={t('sort')} search={t('search')} />
      <CourseListWrapper
        courses={courses}
        viewDetailsText={t('viewDetails')}
        addToCartText={t('addToCart')}
      />
    </div>
  );
}
