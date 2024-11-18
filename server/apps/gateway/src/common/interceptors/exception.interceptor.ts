import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Request } from 'express';
import { RpcException } from '@nestjs/microservices';
import { EnrichedError, GatewayException, Status } from '../../types/exception';
import { LoggerService } from '../logger.service';
import { Metadata } from '@grpc/grpc-js';

const grpcToHttpStatus = new Map<Status, number>([
  [Status.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST],
  [Status.FAILED_PRECONDITION, HttpStatus.PRECONDITION_FAILED],
  [Status.NOT_FOUND, HttpStatus.NOT_FOUND],
  [Status.ALREADY_EXISTS, HttpStatus.CONFLICT],
  [Status.PERMISSION_DENIED, HttpStatus.FORBIDDEN],
  [Status.UNAUTHENTICATED, HttpStatus.UNAUTHORIZED],
  [Status.RESOURCE_EXHAUSTED, HttpStatus.TOO_MANY_REQUESTS],
  [Status.UNIMPLEMENTED, HttpStatus.NOT_IMPLEMENTED],
  [Status.INTERNAL, HttpStatus.INTERNAL_SERVER_ERROR],
  [Status.UNAVAILABLE, HttpStatus.SERVICE_UNAVAILABLE],
  [Status.DEADLINE_EXCEEDED, HttpStatus.GATEWAY_TIMEOUT],
]);

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(
    executionContext: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        const contextType = executionContext.getType();

        if (contextType === 'http') {
          error = this.handleHttpError(error, executionContext);
        } else if (contextType === 'rpc') {
          error = this.handleGrpcError(error, executionContext);
        } else {
          error = this.createGenericError(error, executionContext);
        }
        error.message = this.cleanErrorMessage(error.message);
        return throwError(() => error);
      }),
    );
  }

  private cleanErrorMessage(message: string): string {
    return message.replace(/^\d+\s+[A-Z]+:\s*/, '');
  }

  private createGenericError(
    error: any,
    executionContext: ExecutionContext,
  ): EnrichedError {
    const request = executionContext.switchToHttp().getRequest<Request>();
    const metadata = error.metadata?.getMap() || {};
    const status =
      metadata?.statuscode ||
      error.status ||
      HttpStatus.INTERNAL_SERVER_ERROR;
    return {
      message: error.message || 'Unknown error occurred',
      status,
      timestamp: new Date().toISOString(),
      context: `${executionContext.getClass().name}/${executionContext.getHandler().name}`,
      path: request.url,
      name: 'GenericError',
    };
  }

  private handleHttpError(
    error: any,
    executionContext: ExecutionContext,
  ): Error {
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const request = executionContext.switchToHttp().getRequest<Request>();
    const metadata = error.metadata?.getMap() || {};
    const statusCode = metadata?.statuscode || status;

    const enrichedError: EnrichedError = {
      name: 'HttpError',
      message: error.message || 'Internal server error',
      status: statusCode,
      user: request.headers?.['user'],
      traceid:
        error.traceid ||
        request.headers['x-trace-id'] ||
        request.headers['traceid'],
      context: `${executionContext.getClass().name}/${executionContext.getHandler().name}`,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Handle external service errors (e.g. Axios)
    if (this.isExternalServiceError(error)) {
      return this.sanitizeExternalError(error, enrichedError);
    }

    return enrichedError;
  }

  private handleGrpcError(
    error: any,
    executionContext: ExecutionContext,
  ): EnrichedError {
    const context = executionContext.switchToRpc();
    const metadata = context.getContext();

    // Convert RPC exceptions to Gateway exceptions
    if (error instanceof RpcException || error.code) {
      const details = error.getError ? error.getError() : error;
      const status =
        typeof details === 'object' ? details['code'] : Status.INTERNAL;
      const httpStatus =
        grpcToHttpStatus.get(status) || HttpStatus.INTERNAL_SERVER_ERROR;

      return {
        name: 'GrpcError',
        message: error.message || 'gRPC service error',
        status: httpStatus,
        code: status.toString(),
        context: `${executionContext.getClass().name}/${executionContext.getHandler().name}`,
        timestamp: new Date().toISOString(),
        traceid: metadata?.get('traceid')?.[0],
        path: metadata?.get('path')?.[0],
      };
    }

    return this.createGenericError(error, executionContext);
  }

  private isExternalServiceError(error: any): boolean {
    return typeof error?.response === 'object' && error?.isAxiosError;
  }

  private sanitizeExternalError(
    error: any,
    enrichedError: any,
  ): GatewayException {
    const responseData =
      error?.response?.data?.error || error?.response?.data || {};

    return {
      ...enrichedError,
      message:
        responseData.details ||
        responseData.message ||
        'External service error',
      status:
        responseData.status || error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      code: responseData.code || 'EXTERNAL_SERVICE_ERROR',
    };
  }
}
