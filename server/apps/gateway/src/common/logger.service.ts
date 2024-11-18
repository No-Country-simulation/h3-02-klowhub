import { LevelWithSilent } from 'pino';
import { HttpLogger } from 'pino-http';

import { ErrorType, MessageType } from '../types/loggerType';
import { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';

export abstract class LoggerService<T extends HttpLogger = HttpLogger> {
  abstract pino: T;
  abstract connect<TLevel = LevelWithSilent>(logLevel?: TLevel): void;
  abstract setApplication(app: string): void;
  /**
   * @deprecated The method should be use only in main.ts, this log won't be saved in elastic, only sdout
   */
  abstract log(message: string, ...optionalParams: unknown[]): void;
  /**
   * this log won't be saved in elastic, only sdout
   */
  abstract logGrpcCall(
    service: string,
    method: string,
    metadata: Metadata,
    request: unknown,
    status: Status,
    duration: number,
  ): void;
  abstract logGrpcError(
    service: string,
    method: string,
    error: ErrorType,
    metadata: Metadata,
  ): void;
  abstract trace({ message, context, obj }: MessageType): void;
  abstract info({ message, context, obj }: MessageType): void;
  abstract warn({ message, context, obj }: MessageType): void;
  abstract error(error: ErrorType, message?: string, context?: string): void;
  abstract fatal(error: ErrorType, message?: string, context?: string): void;
}
