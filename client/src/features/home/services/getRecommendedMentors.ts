import type { MentorsCardType } from '@core/schemas/mentor-card.schema';
import { apiService } from '@core/services/api.service';

export const getRecommendedMentors = async () => {
  const [error, data] = await apiService.get<MentorsCardType[]>(
    '/json/recommended-mentors.json',
    undefined,
    'APP_URL'
  );
  if (error || !data) {
    return [];
  }

  return data;
};
