import {
  Injectable,
  Scope,
} from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'node:http';
import { LevelWithSilent, Logger, multistream, pino } from 'pino';
import { HttpLogger, Options, pinoHttp } from 'pino-http';
import pinoPretty from 'pino-pretty';
import { LoggerService } from './logger.service';
import { ErrorType, MessageType } from '../types/loggerType';
import { ApiException, Status } from '../types/exception';
import { gray, green, isColorSupported, red, yellow } from './color';
import { formatDate } from './formatDay';
import { Metadata } from '@grpc/grpc-js';

@Injectable({ scope: Scope.REQUEST })
export class LoggerServiceAdapter implements LoggerService {
  pino: HttpLogger;
  private app: string;
  private readonly grpcStatusMap: Map<Status, string>;

  constructor() { 
    this.grpcStatusMap = new Map([
      [Status.OK, 'OK'],
      [Status.CANCELLED, 'CANCELLED'],
      [Status.UNKNOWN, 'UNKNOWN'],
      [Status.INVALID_ARGUMENT, 'INVALID_ARGUMENT'],
      [Status.DEADLINE_EXCEEDED, 'DEADLINE_EXCEEDED'],
      [Status.NOT_FOUND, 'NOT_FOUND'],
      [Status.ALREADY_EXISTS, 'ALREADY_EXISTS'],
      [Status.PERMISSION_DENIED, 'PERMISSION_DENIED'],
      [Status.RESOURCE_EXHAUSTED, 'RESOURCE_EXHAUSTED'],
      [Status.FAILED_PRECONDITION, 'FAILED_PRECONDITION'],
      [Status.ABORTED, 'ABORTED'],
      [Status.OUT_OF_RANGE, 'OUT_OF_RANGE'],
      [Status.UNIMPLEMENTED, 'UNIMPLEMENTED'],
      [Status.INTERNAL, 'INTERNAL'],
      [Status.UNAVAILABLE, 'UNAVAILABLE'],
      [Status.DATA_LOSS, 'DATA_LOSS'],
      [Status.UNAUTHENTICATED, 'UNAUTHENTICATED'],
    ]);
  }

  setApplication(app: string): void {
    this.app = app;
  }

  connect<T = LevelWithSilent>(logLevel: T): void {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const pinoLogger = pino(
      {
        level: [logLevel, 'trace'].find(Boolean).toString(),
        formatters: {
          level(label) {
            return { level: label };
          },
        },
      },
      multistream([
        {
          level: isDevelopment ? 'trace' : 'info',
          stream: isDevelopment
            ? pinoPretty(this.getPinoConfig())
            : process.stdout,
        },
      ]),
    );

    this.pino = pinoHttp(this.getPinoHttpConfig(pinoLogger));
  }

  logGrpcCall(
    service: string,
    method: string,
    metadata: Metadata,
    request: unknown,
    status: Status,
    duration: number,
  ): void {
    const traceId = this.extractTraceId(metadata);
    
    this.pino.logger.info({
      type: 'grpc',
      service,
      method,
      status: this.grpcStatusMap.get(status) || 'UNKNOWN',
      statusCode: status,
      duration,
      request: this.sanitizeRequest(request),
      traceId,
      timestamp: this.getDateFormat(),
      environment: process.env.NODE_ENV,
      application: this.app,
    });
  }

  logGrpcError(
    service: string,
    method: string,
    error: any,
    metadata: Metadata,
  ): void {
    const traceId = this.extractTraceId(metadata);
    const isApi = error instanceof ApiException;
    this.pino.logger.error({
      type: 'grpc_error',
      service,
      method,
      error: {
        code: "code" in error ? error?.code : "Unknown",  
        message: error.message,
        details: "details" in error ? error?.details : "No details available",
        status: "code" in error ? this.grpcStatusMap.get(error.code) || 'UNKNOWN' : error?.statusCode || error?.status || "500",
      },
      traceId,
      timestamp: this.getDateFormat(),
      environment: process.env.NODE_ENV,
      application: this.app,
      stack: error.stack,
    });
  }

  private logStructured(
    level: 'trace' | 'info' | 'warn',
    { message, context, obj = {}, service, method }: MessageType,
    colorFn: (msg: string) => string,
  ): void {
    const enrichedObj = {
      ...obj,
      context: context || this.app,
      timestamp: this.getDateFormat(),
      environment: process.env.NODE_ENV,
      service,
      method,
    };

    this.pino.logger[level](enrichedObj, colorFn(message));
  }

  log(message: string): void {
    this.trace({ message });
  }

  trace(params: MessageType): void {
    if (
      params.message.includes('Module') &&
      params.message.includes('initialized')
    )
      return;
    this.logStructured('trace', params, gray);
  }

  info(params: MessageType): void {
    this.logStructured('info', params, green);
  }

  warn(params: MessageType): void {
    this.logStructured('warn', params, yellow);
  }

  error(error: any, message?: string, context?: string): void { 
    const traceId = this.getTraceId(error);
    const statusCode = "statusCode" in error ? error?.statusCode : "status" in error ? error.status : 500;
    const metadata = "metadata" in error ? this.redactSensitiveHeaders(error?.metadata?.getMap()): undefined;
    this.pino.logger.error({
      context: context || this.app || 'NoContext:DefaultValue',
      type: typeof error === 'string' ? 'Error' : error.name,
      code: "code" in error ? error?.code : "Unknown",
      status: "code" in error ? this.grpcStatusMap.get(error.code) || 'UNKNOWN' : error?.statusCode || error?.status || "500",
      statusCode,  
      traceId,
      environment: process.env.NODE_ENV,
      timestamp: this.getDateFormat(),
      application: this.app,
      stack: typeof error === 'string' ? new Error(error).stack : error.stack,
      metadata,
    }, message && red(message));
  }

  fatal(error: ErrorType, message?: string, context?: string): void {
    const hasGetResponse = "getResponse" in error && typeof error.getResponse === 'function';
    const responses = hasGetResponse ? (error.getResponse() as object) : {};
    this.pino.logger.fatal(
      {
        ...responses,
        context: context || this.app || 'NoContext:DefaultValue',
        type: typeof error === 'string' ? 'Error' : error.name,
        traceid: this.getTraceId(error),
        timestamp: this.getDateFormat(),
        application: this.app,
        stack: typeof error === 'string' ? new Error(error).stack : error.stack,
      },
      message && red(message),
    );
  }

  private getPinoConfig() {
    return {
      colorize: isColorSupported(),
      levelFirst: true,
      ignore: 'pid,hostname',
      customPrettifiers: {
        time: () => `[${this.getDateFormat()}]`,
      },
      messageFormat: (log: unknown, messageKey: string) => {
        const message = log[String(messageKey)];
        return this.app ? `[${this.app}] ${message}` : message;
      },
    };
  }

  private getPinoHttpConfig(pinoLogger: Logger): Options {
    return {
      logger: pinoLogger,
      quietReqLogger: true,
      customSuccessMessage: (req: IncomingMessage, res: ServerResponse) => {
        const upstream = req.headers['x-upstream-service'];
        return `Gateway ${res.statusCode >= 400 ? red('error') : green('success')} - ${
          upstream ? `[${upstream}] ` : ''
        }status code: ${res.statusCode}`;
      },
      customErrorMessage: (
        req: IncomingMessage,
        res: ServerResponse,
        error: Error,
      ) => {
        return `request ${red(error.name)} with status code: ${res.statusCode} `;
      },
      genReqId: (req: IncomingMessage) => {
        return (
          req.headers['x-trace-id'] as string ||
          req.headers['traceid'] as string ||
          crypto.randomUUID()
        );
      },
      redact: {
        paths: ['req.headers.authorization', 'req.headers.cookie', 'req.headers.token', 'req.headers["api-key"]', 'req.headers["x-api-key"]'],
        remove: true,
      },
      customAttributeKeys: {
        req: 'request',
        res: 'response',
        err: 'error',
        responseTime: 'timeTaken',
        reqId: 'traceid',
      },
      serializers: {
        req: (request) => ({
          method: request.method,
          url: request.url,
          headers: this.redactSensitiveHeaders(request.headers),
          upstream: request.headers['x-upstream-service'],
        }),
        res: (response) => ({
          statusCode: response.statusCode,
          upstream: (typeof response.getHeader === 'function'
            ? response?.getHeader('x-upstream-service')
            : response?.headers?.['x-upstream-service']) || null,
        }),
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      customProps: (req: any): any => {
        const traceId = req.id || 
        req.headers['x-trace-id'] || 
        req.headers['traceid'] || 
        crypto.randomUUID();

        const path = `****://${req.headers.host}${req.url}`;
        const upstream = req.headers['x-upstream-service'];

        const props = {
          traceId,
          application: this.app,
          path,
          timestamp: this.getDateFormat(),
          upstream,
        };

        this.pino.logger.setBindings(props);
        return props;
      },
      customLogLevel: (_, res, error) => {
        if (res.statusCode >= 400 || error) {
          return 'error';
        }
        if (res.statusCode >= 300 && res.statusCode < 400) {
          return 'silent';
        }
        return 'info';
      },
    };
  }

  private redactSensitiveHeaders(headers: Record<string, unknown>): Record<string, unknown> {
    const sensitiveHeaders = [
      'authorization',
      'cookie',
      'x-api-key',
      'api-key',
      'token',
    ];
    
    return Object.entries(headers).reduce((acc, [key, value]) => {
      acc[key] = sensitiveHeaders.includes(key.toLowerCase())
        ? '[REDACTED]'
        : value;
      return acc;
    }, {});
  }

  private extractTraceId(metadata: Metadata): string {
    return (
      metadata.get('x-trace-id')[0] as string ||
      metadata.get('traceid')[0] as string ||
      crypto.randomUUID()
    );
  }

  private sanitizeRequest(request: unknown): unknown {
    if (typeof request !== 'object' || !request) return request;
    
    const sanitized = { ...request as object };
    const sensitiveFields = ['password', 'token', 'auth', 'key', 'secret'];
    
    for (const [key, value] of Object.entries(sanitized)) {
      if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object') {
        sanitized[key] = this.sanitizeRequest(value);
      }
    }
    
    return sanitized;
  }

  private getDateFormat(
    date = new Date(),
    format = 'dd/MM/yyyy HH:mm:ss',
  ): string {
    return formatDate(date);
  }

  private getTraceId(error): string {
    if (typeof error === 'string') return crypto.randomUUID();
    return [error.traceid, this.pino.logger.bindings()?.tranceId].find(Boolean);
  }
}
