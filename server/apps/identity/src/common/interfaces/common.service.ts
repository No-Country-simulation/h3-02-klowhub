import { Metadata } from '@grpc/grpc-js';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { OrderByCondition, SelectQueryBuilder } from 'typeorm';

import { Base } from '@common/dtos/base.domain';
import { CursorTypeEnum } from '@common/dtos/cursorType';

import { QueryOrderEnum } from '../enum/QueryCursorOrder.enum';
import { Edge, Paginated } from './paginated';

export abstract class CommonService {
  /**
   * Takes a date, string or number and returns the base 64
   * representation of it
   */
  public static encodeCursor(val: Date | string | number): string {
    let str: string;

    if (val instanceof Date) {
      str = val.getTime().toString();
    } else if (typeof val === 'number' || typeof val === 'bigint') {
      str = val.toString();
    } else {
      str = val;
    }

    return Buffer.from(str, 'utf-8').toString('base64');
  }

  /**
   * Takes an instance, the cursor key and a innerCursor,
   * and generates a GraphQL edge
   */
  public static createEdge<T>(
    instance: T,
    cursor: keyof T,
    innerCursor?: string,
  ): Edge<T> {
    try {
      return {
        node: instance,
        cursor: CommonService.encodeCursor(
          innerCursor ? instance[cursor][innerCursor] : instance[cursor],
        ),
      };
    } catch (_) {
      throw new InternalServerErrorException('The given cursor is invalid');
    }
  }

  /**
   * Makes the order by query for Typeorm orderBy method.
   */
  public static getOrderBy<T>(
    cursor: keyof T,
    order: QueryOrderEnum,
    innerCursor?: string,
    nulls?: 'NULLS FIRST' | 'NULLS LAST',
  ): any {
    const orderConfig = { order, ...(nulls ? { nulls } : {}) };

    if (innerCursor) {
      return {
        [String(cursor)]: {
          [innerCursor]: orderConfig,
        },
      };
    }

    return {
      [String(cursor)]: orderConfig,
    };
  }

  public async throwInternalError<T>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      const isObject = typeof error === 'object';
      const metadata = new Metadata();
      metadata.add('statusCode', '500');
      metadata.add('description', 'Error en throwInternalError en common');
      throw new RpcException({
        message:
        isObject && 'message' in error ? error.message : 'Unknown error',
        statusCode: 500,
        service: 'IdentityService',
        metadata,
      });
    }
  }
  public decodeCursor(
    cursor: string,
    cursorType: CursorTypeEnum = CursorTypeEnum.STRING,
  ): string | number | Date {
    const str = Buffer.from(cursor, 'base64').toString('utf-8');

    switch (cursorType) {
      case CursorTypeEnum.DATE:
        const milliUnix = parseInt(str, 10);
        const metadata = new Metadata();
        metadata.add('statusCode', '400');
        metadata.add('description', 'Error en decodeCursor en Common');

        if (isNaN(milliUnix))
          throw new RpcException({
            message: 'Cursor does not reference a valid date',
            statusCode: 400,
            service: 'IdentityService',
            metadata
          });

        return new Date(milliUnix);
      case CursorTypeEnum.NUMBER:
        const num = parseInt(str, 10);

        if (isNaN(num))
          throw new RpcException({
            message: 'Cursor does not reference a valid number',
            statusCode: 400,
            service: 'IdentityService',
            metadata
          });

        return num;
      case CursorTypeEnum.STRING:
      default:
        return str;
    }
  }

  public abstract paginate<T>(
    instances: T[],
    currentCount: number,
    previousCount: number,
    cursor: keyof T,
    first: number,
    innerCursor?: string,
  ): Paginated<T>;
  public abstract formatTitle(title: string): string;
  public abstract validateEntity(entity: Base): Promise<void>;
  public abstract saveEntity<T extends Base>(
    repo: unknown,
    entity: T,
    message: string,
  ): Promise<T>;
  public abstract updateEntity<T extends Base>(
    repo: unknown,
    entity: T,
    message: string,
  ): Promise<T>;
  public abstract throwDuplicateError<T>(
    promise: Promise<T>,
    entity: T,
    message?: string,
  ): Promise<T>;
  public abstract queryBuilderPagination<T>(
    alias: string,
    cursor: keyof T,
    cursorType: CursorTypeEnum,
    first: number,
    order: QueryOrderEnum,
    qb: SelectQueryBuilder<T>,
    after?: string,
    innerCursor?: string,
  ): Promise<Paginated<T>>;
}
