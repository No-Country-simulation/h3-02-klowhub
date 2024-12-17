import type { CourseCardType } from '@core/schemas/course-card.schema';
import { apiService } from '@core/services/api.service';
//import { Console } from 'console';
//import env from '@root/env.config';

export const getRecommendedCourses = async () => {
  const [error, data] = await apiService.get<CourseCardType[]>(
    '/courses/getCourses',
    undefined,
    'API_URL'
  );
  //const [error, data] = await apiService.get<CourseCardType[]>('/json/recommended-courses.json');
  if (error || !data) {
    return [];
  }

  return data;
};
