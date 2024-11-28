import { HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

export const grpcToHttpStatus = new Map<number, number>([
  [status.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST],
  [status.FAILED_PRECONDITION, HttpStatus.PRECONDITION_FAILED],
  [status.NOT_FOUND, HttpStatus.NOT_FOUND],
  [status.ALREADY_EXISTS, HttpStatus.CONFLICT],
  [status.PERMISSION_DENIED, HttpStatus.FORBIDDEN],
  [status.UNAUTHENTICATED, HttpStatus.UNAUTHORIZED],
  [status.RESOURCE_EXHAUSTED, HttpStatus.TOO_MANY_REQUESTS],
  [status.UNIMPLEMENTED, HttpStatus.NOT_IMPLEMENTED],
  [status.INTERNAL, HttpStatus.INTERNAL_SERVER_ERROR],
  [status.UNAVAILABLE, HttpStatus.SERVICE_UNAVAILABLE],
  [status.DEADLINE_EXCEEDED, HttpStatus.GATEWAY_TIMEOUT],
]);

export function mapGrpcToHttpStatus(error: any): { status: number; message: string } {
  const grpcStatus = error?.code || status.INTERNAL;
  const httpStatus = grpcToHttpStatus.get(grpcStatus) || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = error?.details || 'Internal server error';
  return { status: httpStatus, message };
}