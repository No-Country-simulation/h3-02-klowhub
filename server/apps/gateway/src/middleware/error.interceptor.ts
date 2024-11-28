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
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js'; // Asegúrate de importar correctamente

const grpcToHttpStatus = new Map<status, number>([
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

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(
    executionContext: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        const contextType = executionContext.getType();

        let responseError = error; 

        if (contextType === 'http') {
          responseError = this.handleHttpError(error, executionContext);
        } else if (contextType === 'rpc') {
          responseError = this.handleGrpcError(error, executionContext);
        } else {
          responseError = this.createGenericError(error, executionContext);
        }

        return throwError(() => responseError);
      }),
    );
  }

  private cleanErrorMessage(message: string): string {
    return message.replace(/^\d+\s+[A-Z]+:\s*/, ''); 
  }

  private handleHttpError(
    error: any,
    executionContext: ExecutionContext,
  ): any {
    const status =
      error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const request = executionContext.switchToHttp().getRequest();
    const enrichedError = {
      name: 'HttpError',
      message: error.message || 'Internal server error',
      status: status,
      traceid: request.headers['x-trace-id'] || request.headers['traceid'],
      context: `${executionContext.getClass().name}/${executionContext.getHandler().name}`,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    return enrichedError;
  }

  private handleGrpcError(
    error: any,
    executionContext: ExecutionContext,
  ): any {
    if (error instanceof RpcException) {
      const details = error.getError(); 

      let statusCode = status.INTERNAL;
      let message = 'gRPC service error'; 

      if (typeof details === 'object' && details !== null && 'code' in details) {
        statusCode = (details as { code: status }).code;
      }

      const httpStatus = grpcToHttpStatus.get(statusCode) || HttpStatus.INTERNAL_SERVER_ERROR;

      if (typeof details === 'object' && details !== null && 'message' in details) {
        message = (details as { message: string }).message;
      }

      return new HttpException(
        {
          message,
          statusCode: httpStatus,
        },
        httpStatus, 
      );
    }

    return this.createGenericError(error, executionContext);
  }

  private createGenericError(
    error: any,
    executionContext: ExecutionContext,
  ): any {
    const request = executionContext.switchToHttp().getRequest();
    return {
      message: error.message || 'Unknown error occurred',
      status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      context: `${executionContext.getClass().name}/${executionContext.getHandler().name}`,
      path: request.url,
      name: 'GenericError',
    };
  }
}