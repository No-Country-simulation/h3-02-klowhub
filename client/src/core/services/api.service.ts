import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3002';
//Instancia de axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 19999,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

type HandleRequestResponse = () => Promise<AxiosResponse>;

//Envia la peticion utilizando axios
//Devuelva una respuesta utilizando un patron [error, data]
//Patron util para asegurar el manejo del error
const handleRequest = async (request: HandleRequestResponse) => {
  try {
    const response = await request();
    //Si no hubo errores se envia la data y error undefined
    return [undefined, response.data];
  } catch (error) {
    //SI hubo algun error se maneja y data undefined
    return [handleError(error), undefined];
  }
};
const handleError = (error: unknown) => {
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
  async get(url: string, config: AxiosRequestConfig | undefined = {}) {
    return handleRequest(() => api.get(url, config));
  },

  async post(
    url: string,
    data: Record<string, string>,
    config: AxiosRequestConfig | undefined = {}
  ) {
    return handleRequest(() => api.post(url, data, config));
  },

  async put(
    url: string,
    data: Record<string, string>,
    config: AxiosRequestConfig | undefined = {}
  ) {
    return handleRequest(() => api.put(url, data, config));
  },

  async delete(url: string, config: AxiosRequestConfig | undefined = {}) {
    return handleRequest(() => api.delete(url, config));
  },
};

//La instancia de axios es el import default
export default api;
