import {
    Injectable,
    InternalServerErrorException,
    Scope,
  } from '@nestjs/common';
  import { IncomingMessage, ServerResponse } from 'node:http';
  import { LevelWithSilent, Logger, multistream, pino } from 'pino';
  import { HttpLogger, Options, pinoHttp } from 'pino-http';
  import pinoPretty from 'pino-pretty';
import { LoggerService } from './logger.service';
import { ErrorType, MessageType } from '../types/loggerType';
import { ApiException } from '../types/exception';
import { gray, green, isColorSupported, red, yellow } from './color';
import { formatDate } from './formatDay';
  
  @Injectable({ scope: Scope.REQUEST })
  export class LoggerServiceAdapter implements LoggerService {
    pino: HttpLogger;
    private app: string;
  
    constructor() {}
  
    setApplication(app: string): void {
      this.app = app;
    }
  
    connect<T = LevelWithSilent>(logLevel: T): void {
      const isDevelopment = process.env.NODE_ENV === 'development';
      const pinoLogger = pino(
        {
          level: [logLevel, 'trace'].find(Boolean).toString(),
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
  
    private logStructured(
      level: 'trace' | 'info' | 'warn',
      { message, context, obj = {} }: MessageType,
      colorFn: (msg: string) => string,
    ): void {
      const enrichedObj = {
        ...obj,
        context: context || this.app,
        timestamp: this.getDateFormat(),
        environment: process.env.NODE_ENV,
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
  
    error(error: ErrorType, message?: string, context?: string): void {
      const errorResponse = this.getErrorResponse(error);
      const traceId = this.getTraceId(error);
      const response =
        error?.name === ApiException.name
          ? { statusCode: error['statusCode'], message: error?.message }
          : errorResponse?.value();
  
      this.pino.logger.error(
        {
          ...response,
          context: context || this.app || 'NoContext:DefaultValue',
          type: typeof error === 'string' ? 'Error' : error.name,
          traceId,
          environment: process.env.NODE_ENV,
          timestamp: this.getDateFormat(),
          application: this.app,
          stack: typeof error === 'string' ? new Error(error).stack : error.stack,
          code: error?.['code'],
          statusCode: error?.['statusCode'],
        },
        message && red(message),
      );
    }
  
    fatal(error: ErrorType, message?: string, context?: string): void {
      this.pino.logger.fatal(
        {
          ...(error.getResponse() as object),
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
          return `request ${res.statusCode >= 400 ? red('errror') : green('success')} with status code: ${res.statusCode}`;
        },
        customErrorMessage: (
          req: IncomingMessage,
          res: ServerResponse,
          error: Error,
        ) => {
          return `request ${red(error.name)} with status code: ${res.statusCode} `;
        },
        genReqId: (req: IncomingMessage) => {
          return (req.headers.traceid as string) || crypto.randomUUID();
        },
        redact: {
          paths: ['req.headers.authorization', 'req.headers.cookie'],
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
          req: (request) => {
            return {
              method: request.method,
              url: request.url,
              headers: this.redactSensitiveHeaders(request.headers),
            };
          },
          res: (response) => {
            return {
              statusCode: response.statusCode,
            };
          },
          err: () => false,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        customProps: (req: any): any => {
          const customCtx = req.customContext;
          const traceid = [req?.headers?.traceid, req.id].find(Boolean);
  
          const path = `${req.protocol}://${req.headers.host}${req.url}`;
  
          this.pino.logger.setBindings({
            traceid,
            application: this.app,
            context: customCtx,
            path,
            timestamp: this.getDateFormat(),
          });
  
          return {
            traceid,
            application: this.app,
            context: customCtx,
            path,
            timestamp: this.getDateFormat(),
          };
        },
        customLogLevel: (_, res: ServerResponse, error: Error) => {
          if ([res.statusCode >= 400, error].some(Boolean)) {
            return 'error';
          }
  
          if ([res.statusCode >= 300, res.statusCode <= 400].every(Boolean)) {
            return 'silent';
          }
  
          return 'info';
        },
      };
    }
  
    private redactSensitiveHeaders(headers: Record<string, unknown>) {
      const sensitiveHeaders = ['authorization', 'cookie'];
      return Object.entries(headers).reduce((acc, [key, value]) => {
        acc[key] = sensitiveHeaders.includes(key.toLowerCase())
          ? '[REDACTED]'
          : value;
        return acc;
      }, {});
    }
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getErrorResponse(error: ErrorType): any {
      const isFunction = typeof error?.getResponse === 'function';
      return [
        {
          conditional: typeof error === 'string',
          value: () => new InternalServerErrorException(error).getResponse(),
        },
        {
          conditional: isFunction && typeof error.getResponse() === 'string',
          value: () =>
            new ApiException(
              error.getResponse(),
              [error.getStatus(), error['status']].find(Boolean),
              error['context'],
            ),
        },
        {
          conditional: isFunction && typeof error.getResponse() === 'object',
          value: () => error?.getResponse(),
        },
        {
          conditional: [
            error?.name === Error.name,
            error?.name == TypeError.name,
          ].some(Boolean),
          value: () =>
            new InternalServerErrorException(error.message).getResponse(),
        },
      ].find((c) => c.conditional);
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
  