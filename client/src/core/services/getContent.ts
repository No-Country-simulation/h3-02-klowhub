import { apiService } from './api.service';

export const getContent = async <T = unknown>(url: string, init?: RequestInit) => {
  const [error, data] = await apiService.get<T>(url, init);
  if (error || !data) {
    if (Array.isArray([] as T)) {
      return [] as T;
    }
    return {} as T;
  }

  return data as T;
};
