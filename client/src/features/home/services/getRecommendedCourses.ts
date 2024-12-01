import type { CourseCardType } from '@core/schemas/course-card.schema';
import { apiService } from '@core/services/api.service';

export const getRecommendedCourses = async () => {
  const [error, data] = await apiService.get<CourseCardType[]>('/json/recommended-courses.json');
  if (error || !data) {
    return [];
  }

  return data;
};
