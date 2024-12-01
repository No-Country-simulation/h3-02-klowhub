import type { AppsCardType } from '@core/schemas/app-card.schema';
import { apiService } from '@core/services/api.service';

export const getRecommendedApps = async () => {
  const [error, data] = await apiService.get<AppsCardType[]>('/json/recommended-apps.json');
  if (error || !data) {
    return [];
  }

  return data;
};
