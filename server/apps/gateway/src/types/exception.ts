import { HttpException, HttpStatus } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';

export enum Status {
  OK = 0,
  CANCELLED = 1,
  UNKNOWN = 2,
  INVALID_ARGUMENT = 3,
  DEADLINE_EXCEEDED = 4,
  NOT_FOUND = 5,
  ALREADY_EXISTS = 6,
  PERMISSION_DENIED = 7,
  RESOURCE_EXHAUSTED = 8,
  FAILED_PRECONDITION = 9,
  ABORTED = 10,
  OUT_OF_RANGE = 11,
  UNIMPLEMENTED = 12,
  INTERNAL = 13,
  UNAVAILABLE = 14,
  DATA_LOSS = 15,
  UNAUTHENTICATED = 16
}

export type ErrorModel = {
  error: {
    code: string | number;
    traceid: string;
    message: string;
    details?: unknown;
    timestamp: string;
    path: string;
  };
};

export class ApiException extends HttpException {
  context: string;
  traceid?: string | number;
  statusCode: number;
  code?: string;
  config?: unknown;
  user?: string;
  codeGrpc?: Status;
  details?: string;
  metadata?: Metadata;

  constructor(
    error: string | object,
    status?: HttpStatus,
    private readonly ctx?: string,
  ) {
    super(error, [status, 500].find(Boolean));
    this.statusCode = super.getStatus();

    if (ctx) {
      this.context = ctx;
    }
  }
}

export interface ErrorResponse {
  code: number;
  traceid: string;
  message: string;
  details?: unknown;
  timestamp: string;
  path: string;
  service?: string;
  method?: string;
}

export interface EnrichedError extends Error {
  status: number;
  user?: any;
  traceid?: string;
  context: string;
  code?: string | number;
  timestamp: string;
  path: string;
}

export class GatewayException extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: number,
    public readonly details?: unknown,
    public readonly metadata?: Metadata,
    public readonly service?: string,
    public readonly method?: string,
  ) {
    super(message);
    this.name = 'GatewayException';
  }
}