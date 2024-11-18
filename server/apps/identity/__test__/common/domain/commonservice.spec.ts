import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { QueryOrderEnum } from '@/common/domain/enum/QueryCursorOrder.enum';
import { CommonService } from '@/common/domain/port/common.service';
import { CursorTypeEnum } from '@/common/domain/types/cursorType';

import { TestCommonService } from './TestCommonService';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    service = new TestCommonService();
  });

  describe('encodeCursor', () => {
    it('should encode a date value', () => {
      const date = new Date('2024-01-01');
      const encoded = CommonService.encodeCursor(date);
      expect(encoded).toBe(
        Buffer.from(date.getTime().toString(), 'utf-8').toString('base64'),
      );
    });

    it('should encode a number value', () => {
      const number = 12345;
      const encoded = CommonService.encodeCursor(number);
      expect(encoded).toBe(
        Buffer.from(number.toString(), 'utf-8').toString('base64'),
      );
    });

    it('should encode a string value', () => {
      const str = 'test-string';
      const encoded = CommonService.encodeCursor(str);
      expect(encoded).toBe(Buffer.from(str, 'utf-8').toString('base64'));
    });
  });

  describe('createEdge', () => {
    it('should create an edge with direct cursor', () => {
      const instance = { id: 1, name: 'test' };
      const edge = CommonService.createEdge(instance, 'id');

      expect(edge).toEqual({
        node: instance,
        cursor: CommonService.encodeCursor(instance.id),
      });
    });

    it('should create an edge with inner cursor', () => {
      const instance = {
        id: 1,
        timestamp: {
          created: new Date('2024-01-01'),
        },
      };
      const edge = CommonService.createEdge(instance, 'timestamp', 'created');

      expect(edge).toEqual({
        node: instance,
        cursor: CommonService.encodeCursor(instance.timestamp.created),
      });
    });

    it('should throw InternalServerErrorException for invalid cursor', () => {
      const instance = { id: 1 };
      expect(() => {
        CommonService.createEdge(instance, 'invalidKey' as any);
      }).toThrow(InternalServerErrorException);
    });
  });

  describe('getOrderBy', () => {
    it('should create order by object without inner cursor', () => {
      const result = CommonService.getOrderBy('createdAt', QueryOrderEnum.ASC);
      expect(result).toEqual({ createdAt: QueryOrderEnum.ASC });
    });

    it('should create order by object with inner cursor', () => {
      const result = CommonService.getOrderBy(
        'timestamp',
        QueryOrderEnum.DESC,
        'created',
      );
      expect(result).toEqual({
        timestamp: {
          created: QueryOrderEnum.DESC,
        },
      });
    });
  });

  describe('throwInternalError', () => {
    it('should return resolved promise value', async () => {
      const promise = Promise.resolve('success');
      const result = await service.throwInternalError(promise);
      expect(result).toBe('success');
    });

    it('should throw InternalServerErrorException on promise rejection', async () => {
      const promise = Promise.reject('error');
      await expect(service.throwInternalError(promise)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('decodeCursor', () => {
    it('should decode string cursor', () => {
      const original = 'test-string';
      const encoded = CommonService.encodeCursor(original);
      const decoded = service.decodeCursor(encoded, CursorTypeEnum.STRING);
      expect(decoded).toBe(original);
    });

    it('should decode number cursor', () => {
      const original = 12345;
      const encoded = CommonService.encodeCursor(original);
      const decoded = service.decodeCursor(encoded, CursorTypeEnum.NUMBER);
      expect(decoded).toBe(original);
    });

    it('should decode date cursor', () => {
      const date = new Date('2024-01-01');
      const encoded = CommonService.encodeCursor(date);
      const decoded = service.decodeCursor(encoded, CursorTypeEnum.DATE);
      expect(decoded).toEqual(date);
    });

    it('should throw BadRequestException for invalid number cursor', () => {
      const encoded = CommonService.encodeCursor('not-a-number');
      expect(() => {
        service.decodeCursor(encoded, CursorTypeEnum.NUMBER);
      }).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for invalid date cursor', () => {
      const encoded = CommonService.encodeCursor('not-a-date');
      expect(() => {
        service.decodeCursor(encoded, CursorTypeEnum.DATE);
      }).toThrow(BadRequestException);
    });

    it('should default to string cursor type', () => {
      const original = 'test-string';
      const encoded = CommonService.encodeCursor(original);
      const decoded = service.decodeCursor(encoded);
      expect(decoded).toBe(original);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
