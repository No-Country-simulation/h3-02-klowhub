import { type ApiErrorType, type ApiResultType } from '@coreTypes/actionResponse';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const handleError = (error: Error, status?: number): ApiErrorType => {
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
  init?: RequestInit,
  baseUrlType: 'APP_URL' | 'API_URL' = 'APP_URL' // Parámetro explícito
): Promise<ApiResultType<T>> => {
  try {
    const baseUrl = baseUrlType === 'APP_URL' ? APP_URL : API_URL;
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
      return [
        handleError(new Error('Request failed'), response.status),
        undefined,
        response.headers,
      ];
    }

    const data = await response.json();
    return [undefined, data as T, response.headers];
  } catch (error) {
    return [
      handleError(error instanceof Error ? error : new Error('Unknown error')),
      undefined,
      undefined,
    ];
  }
};

// API Services con `baseUrlType` para alternar URLs
export const apiService = {
  async get<T = unknown>(
    url: string,
    init: RequestInit | undefined = {},
    baseUrlType: 'APP_URL' | 'API_URL' = 'API_URL'
  ) {
    return handleRequest<T>(url, { method: 'GET', ...init }, baseUrlType);
  },

  async post<T = unknown>(
    url: string,
    body: Record<string, string>,
    init: RequestInit | undefined = {},
    baseUrlType: 'APP_URL' | 'API_URL' = 'API_URL'
  ): Promise<ApiResultType<T>> {
    return handleRequest<T>(
      url,
      { method: 'POST', body: JSON.stringify(body), ...init },
      baseUrlType
    );
  },

  async put<T = unknown>(
    url: string,
    body: Record<string, string>,
    init: RequestInit | undefined = {},
    baseUrlType: 'APP_URL' | 'API_URL' = 'API_URL'
  ) {
    return handleRequest<T>(
      url,
      { method: 'PUT', body: JSON.stringify(body), ...init },
      baseUrlType
    );
  },

  async delete<T = unknown>(
    url: string,
    init: RequestInit | undefined = {},
    baseUrlType: 'APP_URL' | 'API_URL' = 'API_URL'
  ) {
    return handleRequest<T>(url, { method: 'DELETE', ...init }, baseUrlType);
  },
};
