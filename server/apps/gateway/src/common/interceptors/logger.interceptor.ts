import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
import { LoggerService } from '../logger.service';
import { Metadata } from '@grpc/grpc-js';
  
const TRACE_HEADER = 'x-trace-id';
const LEGACY_TRACE_HEADER = 'traceid';
const UPSTREAM_SERVICE = 'x-upstream-service';

  @Injectable()
  export class HttpLoggerInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) {}
    intercept(
      executionContext: ExecutionContext,
      next: CallHandler,
    ): Observable<unknown> {
      const contextType = executionContext.getType();
    
      if (contextType === 'http') {
        return this.handleHttpRequest(executionContext, next);
      } else if (contextType === 'rpc') {
        return this.handleGrpcRequest(executionContext, next);
      }
  
      return next.handle();
    }

    private handleHttpRequest(
      executionContext: ExecutionContext,
      next: CallHandler,
    ): Observable<unknown> {
      const context = this.getContextPath(executionContext);
      const request = executionContext.switchToHttp().getRequest();
      const response = executionContext.switchToHttp().getResponse();
  
      // Enrich request with context information
      request.customContext = {
        path: context,
        type: 'http',
        timestamp: new Date().toISOString(),
      };
  
      // Ensure trace ID exists and is consistent
      const traceId = this.ensureTraceId(request.headers);
      request.headers[TRACE_HEADER] = traceId;
      request.headers[LEGACY_TRACE_HEADER] = traceId; // For backwards compatibility
      request.id = traceId;
  
      // Add upstream service information if available
      const upstreamService = request.headers[UPSTREAM_SERVICE];
      if (upstreamService) {
        request.customContext.upstream = upstreamService;
      }
  
      // Apply logger middleware
      this.logger.pino(request, response);
  
      return next.handle();
    }
  
    private handleGrpcRequest(
      executionContext: ExecutionContext,
      next: CallHandler,
    ): Observable<unknown> {
      const context = this.getContextPath(executionContext);
      const grpcContext = executionContext.switchToRpc();
      const metadata = this.getOrCreateMetadata(grpcContext.getContext());
      const data = grpcContext.getData();
  
      // Ensure trace ID in metadata
      const traceId = this.ensureTraceId(metadata);
      metadata.set(TRACE_HEADER, traceId);
      metadata.set(LEGACY_TRACE_HEADER, traceId);
  
      // Get gRPC method metadata if available
      const handler = executionContext.getHandler();
      const grpcMethod = Reflect.getMetadata('grpcMethod', handler);
      const serviceName = Reflect.getMetadata('serviceName', handler);
  
      if (grpcMethod && serviceName) {
        // Log gRPC call start
        this.logger.logGrpcCall(
          serviceName,
          grpcMethod,
          metadata,
          this.sanitizeData(data),
          0, // Initial status
          0, // Duration will be calculated on completion
        );
      }
  
      return next.handle();
    }
  
    private getContextPath(executionContext: ExecutionContext): string {
      const className = executionContext.getClass().name;
      const handlerName = executionContext.getHandler().name;
      return `${className}/${handlerName}`;
    }
  
    private ensureTraceId(headers: Record<string, any> | Metadata): string {
      let traceId: string;
  
      if (headers instanceof Metadata) {
        traceId = (headers.get(TRACE_HEADER)[0] as string) ||
                  (headers.get(LEGACY_TRACE_HEADER)[0] as string);
      } else {
        traceId = headers[TRACE_HEADER] || headers[LEGACY_TRACE_HEADER];
      }
  
      if (!traceId) {
        traceId = crypto.randomUUID();
      }
  
      return traceId;
    }
  
    private getOrCreateMetadata(context: any): Metadata {
      if (!context.metadata) {
        context.metadata = new Metadata();
      }
      return context.metadata;
    }
  
    private sanitizeData(data: unknown): unknown {
      if (!data || typeof data !== 'object') {
        return data;
      }
  
      const sanitized = { ...data };
      const sensitiveFields = ['password', 'token', 'secret', 'key'];
  
      for (const [key, value] of Object.entries(sanitized)) {
        if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
          sanitized[key] = '[REDACTED]';
        } else if (typeof value === 'object') {
          sanitized[key] = this.sanitizeData(value);
        }
      }
  
      return sanitized;
    }
  }
  