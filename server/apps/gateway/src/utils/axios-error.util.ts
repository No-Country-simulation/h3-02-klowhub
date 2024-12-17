import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';

export function handleAxiosError(error: unknown, context: string): { message: string; statusCode: number } {
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage = error.response?.data?.message || 'Error desconocido en el microservicio';
    
    return {
      message: `${context}: ${errorMessage}`,
      statusCode,
    };
  }

  // Manejo de otros errores desconocidos
  return {
    message: `${context}: Ocurrió un error inesperado`,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  };
}
