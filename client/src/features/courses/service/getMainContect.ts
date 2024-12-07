import type { CourseCardType } from '@core/schemas/course-card.schema';
import { apiService } from '@core/services/api.service';

export const getRecommendedCourseById = async (id: string) => {
  const [error, data] = await apiService.get<CourseCardType>(`/courses/course/${id}`);
  console.log('esto es el data', data);
  if (error || !data) {
    console.error('Error fetching course:', error);
    return null;
  }
  if (!(data && data.id)) {
    return null;
  }
  const idUser = data.id;
  const [Uerror, Udata] = await apiService.get<CourseCardType>(`/courses/course/${idUser}`);
  console.log('esto es el data', Udata);
  if (Uerror || !Udata) {
    console.error('Error fetching course:', error);
    return null;
  }

  return { data, Udata };
};
