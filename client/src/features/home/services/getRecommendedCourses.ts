import type { CourseCardType } from '@core/schemas/course-card.schema';
import { apiService } from '@core/services/api.service';

export const getRecommendedCourses = async () => {
  const [error, data] = await apiService.get<CourseCardType[]>('/courses/filter');
  console.log('esto es el data', data);
  if (error || !data) {
    return [];
  }

  return data;
};
