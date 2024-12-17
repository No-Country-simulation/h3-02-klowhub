import { apiService } from './api.service';

export const getContent = async <T = unknown>(
  url: string,
  init?: RequestInit,
  baseUrlType: 'APP_URL' | 'API_URL' = 'APP_URL'
) => {
  // Llamada al servicio con baseUrlType
  const [error, data] = await apiService.get<T>(url, init, baseUrlType);

  // Manejo de errores o datos vacíos
  if (error || !data) {
    if (Array.isArray([] as T)) {
      return [] as T;
    }
    return {} as T;
  }

  return data as T;
};
