import { HttpException } from '@nestjs/common';
import { ApiException } from './exception';

export type MessageType = {
  message: string;
  /**
   * method or class that accour message
   */
  context?: string;
  obj?: object;
};

export type ErrorType = HttpException | ApiException;
