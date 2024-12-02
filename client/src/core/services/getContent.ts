import { apiService } from './api.service';

export const getContent = async <T = unknown>(url: string) => {
  const [error, data] = await apiService.get<T[]>(url);
  if (error || !data) {
    return [];
  }

  return data;
};
