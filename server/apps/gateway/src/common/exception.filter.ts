import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';
import {
  ApiException,
  ErrorResponse,
  Status,
} from '../types/exception';
import { formatDate } from './formatDay';
import { Metadata } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { LoggerService } from './logger.service';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private readonly errorMessages = new Map<number, string>([
    [HttpStatus.BAD_REQUEST, 'Bad Request'],
    [HttpStatus.UNAUTHORIZED, 'Unauthorized'],
    [HttpStatus.FORBIDDEN, 'Forbidden'],
    [HttpStatus.NOT_FOUND, 'Not Found'],
    [HttpStatus.CONFLICT, 'Conflict'],
    [HttpStatus.PRECONDITION_FAILED, 'Precondition Failed'],
    [HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error'],
    [HttpStatus.SERVICE_UNAVAILABLE, 'Service Unavailable'],
    [HttpStatus.GATEWAY_TIMEOUT, 'Gateway Timeout'],
  ]);

  constructor(private readonly logger: LoggerService) {}

  catch(exception: ApiException, host: ArgumentsHost): void {
    const contextType = host.getType();

    if (contextType === 'http') {
      this.handleHttpException(exception, host);
    } else if (contextType === 'rpc') {
      this.handleGrpcException(exception, host);
    } else {
      this.handleGenericException(exception, host);
    }
  }

  private handleGenericException(exception: any, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const status = this.getHttpStatus(exception);
    const traceid = this.getTraceId(exception, request);

    const error = {
      code: status,
      traceid,
      message: exception.message || 'Unknown error',
      details: exception.details || 'No additional details',
      timestamp: formatDate(new Date()),
      path: request.url,
    };

    response.status(status).json({
      error,
    });
  }

  private handleHttpException(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = this.getHttpStatus(exception);
    const traceid = this.getTraceId(exception, request);

    const error: ErrorResponse = {
      code: status,
      traceid,
      message: this.getErrorMessage(exception, status),
      details: this.getErrorDetails(exception),
      timestamp: formatDate(new Date()),
      path: request.url,
      service: exception.service,
      method: exception.method,
    };

    response.status(status).json({ error });
  }

  private handleGrpcException(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToRpc();
    const metadata = ctx.getContext();

    // Create new metadata for the response
    const responseMetadata = new Metadata();
    responseMetadata.set('x-trace-id', this.getTraceId(exception, metadata));

    // Convert to gRPC error format
    const status = exception.code || Status.INTERNAL;
    const details = {
      code: status,
      message: exception.message,
      details: exception.details,
      metadata: responseMetadata.getMap(),
    };

    throw new RpcException(details);
  }

  private getHttpStatus(exception: any): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getTraceId(exception: any, context: any): string {
    if (exception.traceid) {
      return exception.traceid;
    }

    if (context && context.headers) {
      return (
        context.headers['x-trace-id'] ||
        context.headers['traceid'] ||
        'No trace ID available'
      );
    }

    return 'No trace ID available';
  }

  private getErrorMessage(exception: any, status: number): string {
    if (exception.message) {
      return exception.message;
    }
    return this.errorMessages.get(status) || 'Unknown Error';
  }

  private getErrorDetails(exception: any): unknown {
    if (exception.getResponse && typeof exception.getResponse === 'function') {
      const response = exception.getResponse();
      if (typeof response === 'object' && 'errors' in response) {
        return response.errors;
      }
    }
    return exception.details || 'No details available';
  }
}
