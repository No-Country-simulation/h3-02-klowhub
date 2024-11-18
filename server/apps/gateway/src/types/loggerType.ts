import { HttpException } from '@nestjs/common';
import { ApiException } from './exception';
import { RpcException } from '@nestjs/microservices';

export type MessageType = {
  message: string;
  service?: string;
  method?: string; 
  /**
   * method or class that accour message
   */
  context?: string;
  obj?: object;
};


export type ErrorType = ApiException | HttpException | RpcException;
