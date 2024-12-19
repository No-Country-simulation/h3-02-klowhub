import { cookies } from 'next/headers';
import { apiService } from '@core/services/api.service';
import type { CreatorCourseType } from '@features/courses/schemas/creator-course.schemas';

export const getProfile = async () => {
  const token = (await cookies()).get('auth_token');

  const [error, data] = await apiService.get<CreatorCourseType>(
    '/users/profile',
    { headers: { Authorization: `Bearer ${token?.value}` } },
    'API_URL'
  );
  if (error || !data) {
    return null;
  }

  return data;
};
