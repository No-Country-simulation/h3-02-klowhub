import { type ApiErrorType, type ApiResultType } from '@coreTypes/actionResponse';

const API_URL = 'http://localhost:3000';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const isProd = process.env.NODE_ENV === 'production';

const handleError = (error: Error, status?: number): ApiErrorType => {
  // Mapeo de errores específicos
  const errorMap: Record<number, string> = {
    400: 'Bad Request',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    412: 'PRE_CONDITION_FAILED',
    500: 'SERVER_ERROR',
  };

  return {
    error: errorMap[status as number] || error.message,
    status,
  };
};

const handleRequest = async <T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<ApiResultType<T>> => {
  try {
    const baseUrl = isProd ? APP_URL : API_URL;
    const url = typeof input === 'string' ? `${baseUrl}${input}` : input;

    const response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return [handleError(new Error('Request failed'), response.status), undefined];
    }

    const data = await response.json();
    return [undefined, data as T];
  } catch (error) {
    return [handleError(error instanceof Error ? error : new Error('Unknown error')), undefined];
  }
};

//API Services: Wrapper de Axios para hacer 4 peticiones basicas
export const apiService = {
  async get<T = unknown>(url: string, init: RequestInit | undefined = {}) {
    return handleRequest<T>(url, { method: 'GET', ...init });
  },

  async post<T = unknown>(
    url: string,
    body: Record<string, string>,
    init: RequestInit | undefined = {}
  ): Promise<ApiResultType<T>> {
    return handleRequest<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...init,
    });
  },

  async put<T = unknown>(
    url: string,
    body: Record<string, string>,
    init: RequestInit | undefined = {}
  ) {
    return handleRequest<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...init,
    });
  },

  async delete<T = unknown>(url: string, init: RequestInit | undefined = {}) {
    return handleRequest<T>(url, { method: 'DELETE', ...init });
  },
};
