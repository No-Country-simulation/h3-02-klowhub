import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { type ApiErrorType, type ApiResultType } from '@coreTypes/actionResponse';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const isProd = process.env.NODE_ENV === 'production';
//Instancia de axios
const api = axios.create({
  baseURL: isProd ? APP_URL : API_URL,
  timeout: 19999,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
api.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
*/

//Envia la peticion utilizando axios
//Devuelva una respuesta utilizando un patron [error, data]
//Patron util para asegurar el manejo del error
const handleRequest = async <T = unknown>(
  request: () => Promise<AxiosResponse>
): Promise<ApiResultType<T>> => {
  try {
    const response = await request();
    //Si no hubo errores se envia la data y error undefined
    return [undefined, response.data as T];
  } catch (error) {
    //SI hubo algun error se maneja y data undefined
    return [handleError(error), undefined];
  }
};
const handleError = (error: unknown): ApiErrorType | undefined => {
  if (error instanceof AxiosError && error.response) {
    const status = error.response.status;
    //TODO: Actualizar posibles respuesta de errores
    if (status === 401) {
      return { error: 'UNAUTHORIZED' };
    } else if (status === 403) {
      return { error: 'FORBIDDEN' };
    } else if (status === 404) {
      return { error: 'NOT_FOUND' };
    } else if (status === 412) {
      return { error: 'PRE_CONDITION_FAILED' };
    } else if (status >= 500) {
      return { error: 'SERVER_ERROR' };
    } else {
      return { error: error.response.data?.message };
    }
  } else if (error instanceof AxiosError && error.request) {
    return { error: 'NETWORK_ERROR' };
  } else if (error instanceof Error) {
    return { error: error.message };
  }
};

//API Services: Wrapper de Axios para hacer 4 peticiones basicas
export const apiService = {
  async get<T = unknown>(url: string, config: AxiosRequestConfig | undefined = {}) {
    return handleRequest<T>(() => api.get(url, config));
  },

  async post<T = unknown>(
    url: string,
    data: Record<string, string>,
    config: AxiosRequestConfig | undefined = {}
  ): Promise<ApiResultType<T>> {
    return handleRequest<T>(() => api.post(url, data, config));
  },

  async put<T = unknown>(
    url: string,
    data: Record<string, string>,
    config: AxiosRequestConfig | undefined = {}
  ) {
    return handleRequest<T>(() => api.put(url, data, config));
  },

  async delete<T = unknown>(url: string, config: AxiosRequestConfig | undefined = {}) {
    return handleRequest<T>(() => api.delete(url, config));
  },
};

//La instancia de axios es el import default
export default api;
