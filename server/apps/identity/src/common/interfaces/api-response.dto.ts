export interface ApiResponseDTO<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export type ServiceApiResponse<T> = Promise<ApiResponseDTO<T>>;
