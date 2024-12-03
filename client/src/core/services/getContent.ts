/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiService } from './api.service';

export const getContent = async <T = unknown>(url: string, init?: RequestInit) => {
  const [error, data] = await apiService.get<T>(url, init);
  if (error || !data) {
    return (Array.isArray(data) ? [] : null) as T extends Array<any> ? T : T | null;
  }

  return data as T;
};
