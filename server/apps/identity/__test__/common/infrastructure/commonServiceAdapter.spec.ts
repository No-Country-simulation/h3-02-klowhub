import { faker } from '@faker-js/faker';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { validate } from 'class-validator';
import { UUID } from 'crypto';
import { QueryFailedError, Repository } from 'typeorm';

import { Base } from '@/common/domain/models/base.domain';
import { CommonService } from '@/common/domain/port/common.service';
import { CursorTypeEnum } from '@/common/domain/types/cursorType';
import { CommonServiceAdapter } from '@common/services/common.service.adapter';

import { mockRepository } from './utils/MockRepository';

interface IData {
  id: UUID;
  name: string;
  email: string;
}
const FIRST_ID = crypto.randomUUID();
const FOURTY_ID = crypto.randomUUID();
const FIFTY_ID = crypto.randomUUID();
const FIFTEEN_ID = crypto.randomUUID();
const data: IData[] = new Array(50).fill(null).map((_, i) => ({
  id:
    i === 0
      ? FIRST_ID
      : i === 14
        ? FIFTEEN_ID
        : i === 39
          ? FOURTY_ID
          : i === 49
            ? FIFTY_ID
            : crypto.randomUUID(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
}));

jest.mock('class-validator', () => ({
  validate: jest.fn(),
}));

describe('CommonServiceAdapter', () => {
  let service: CommonService;
  let entity: Base;

  beforeEach(async () => {
    service = new CommonServiceAdapter();
    entity = new Base();
  });

  describe('paginate', () => {
    it('should cursor paginate the first 15 entities', () => {
      const paged = service.paginate(
        data.slice(0, 15),
        data.length,
        0,
        'id',
        15,
      );
      const first = paged.edges[0];

      expect(first.cursor).toBe(
        Buffer.from(FIRST_ID, 'utf-8').toString('base64'),
      );
      expect(
        service.decodeCursor(paged.pageInfo.endCursor, CursorTypeEnum.STRING),
      ).toBe(FIFTEEN_ID);
      expect(paged.pageInfo.hasNextPage).toBe(true);
      expect(paged.pageInfo.hasPreviousPage).toBe(false);
      expect(paged.pageInfo.startCursor).toBe(first.cursor);
      expect(paged.pageInfo.endCursor).toBe(
        Buffer.from(FIFTEEN_ID, 'utf-8').toString('base64'),
      );
    });

    it('should paginate the last 10 entities', () => {
      const paged = service.paginate(data.slice(39), 10, 40, 'id', 10);
      const first = paged.edges[0];

      expect(first.cursor).toBe(
        Buffer.from(FOURTY_ID, 'utf-8').toString('base64'),
      );
      expect(
        service.decodeCursor(paged.pageInfo.endCursor, CursorTypeEnum.STRING),
      ).toBe(FIFTY_ID);
      expect(paged.pageInfo.hasNextPage).toBe(false);
      expect(paged.pageInfo.hasPreviousPage).toBe(true);
    });
  });

  describe('formatTitle', () => {
    it('should format a title', () => {
      const hello = 'hello whole world';
      expect(service.formatTitle(hello)).toBe('Hello Whole World');
    });

    it('should format very bad title', () => {
      const veryBad = '\nvery\nbad     \n\n\n\n\n\n\n\n';
      expect(service.formatTitle(veryBad)).toBe('Very Bad');
    });

    it('should format a lot of spaces', () => {
      const loadsOfSpaces =
        '              Loads             of                 Spaces                   \n';
      expect(service.formatTitle(loadsOfSpaces)).toBe('Loads Of Spaces');
    });
  });

  describe('validateEntity', () => {
    it('should throw BadRequestException if entity validation fails', async () => {
      (validate as jest.Mock).mockResolvedValueOnce(['error']); // Simula errores de validación

      await expect(service.validateEntity(entity)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should pass if entity validation succeeds', async () => {
      (validate as jest.Mock).mockResolvedValueOnce([]); // Simula una validación exitosa

      await expect(service.validateEntity(entity)).resolves.not.toThrow();
    });
  });

  describe('saveEntity', () => {
    it('should validate and save the entity', async () => {
      (validate as jest.Mock).mockResolvedValueOnce([]); // Validación exitosa
      const savedEntity = { ...entity, id: crypto.randomUUID() };
      (mockRepository.save as jest.Mock).mockResolvedValueOnce(savedEntity);

      const result = await service.saveEntity(
        mockRepository,
        entity,
        'Error de guardado',
      );
      expect(result).toEqual(savedEntity);
      expect(mockRepository.save).toHaveBeenCalledWith(entity);
    });

    it('should throw ConflictException on duplicate error (PostgreSQL)', async () => {
      (validate as jest.Mock).mockResolvedValueOnce([]);
      const error = new QueryFailedError('', [], { code: '23505' });
      (mockRepository.save as jest.Mock).mockRejectedValueOnce(error);

      await expect(
        service.saveEntity(mockRepository, entity, 'Duplicado'),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException on duplicate error (MySQL)', async () => {
      (validate as jest.Mock).mockResolvedValueOnce([]);
      const error = new QueryFailedError('', [], { code: 'ER_DUP_ENTRY' });
      (mockRepository.save as jest.Mock).mockRejectedValueOnce(error);

      await expect(
        service.saveEntity(mockRepository, entity, 'Duplicado'),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw BadRequestException on other errors', async () => {
      (validate as jest.Mock).mockResolvedValueOnce([]);
      const error = new Error('Otro error');
      (mockRepository.save as jest.Mock).mockRejectedValueOnce(error);

      await expect(
        service.saveEntity(mockRepository, entity, 'Error'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('throwDuplicateError', () => {
    it('should throw ConflictException for PostgreSQL duplicate error (23505)', async () => {
      const mockError = new QueryFailedError('query', [], {
        code: '23505',
        driverError: { code: '23505' },
      });

      const mockPromise = Promise.reject(mockError);

      await expect(
        service.throwDuplicateError(mockPromise, { id: 1, name: 'test' }),
      ).rejects.toThrow(
        new ConflictException(
          'Valor duplicado en la base de datos para: {"id":1,"name":"test"}',
        ),
      );
    });

    it('should throw ConflictException for MySQL duplicate error (ER_DUP_ENTRY)', async () => {
      const mockError = new QueryFailedError('query', [], {
        code: 'ER_DUP_ENTRY',
        driverError: { code: 'ER_DUP_ENTRY' },
      });

      const mockPromise = Promise.reject(mockError);

      await expect(
        service.throwDuplicateError(mockPromise, { id: 1, name: 'test' }),
      ).rejects.toThrow(
        new ConflictException(
          'Valor duplicado en la base de datos para: {"id":1,"name":"test"}',
        ),
      );
    });

    it('should throw BadRequestException for other errors', async () => {
      const mockError = new Error('Some other error');
      const mockPromise = Promise.reject(mockError);

      await expect(
        service.throwDuplicateError(mockPromise, { id: 1, name: 'test' }),
      ).rejects.toThrow(new BadRequestException(mockError));
    });

    it('should resolve the promise if no error is thrown - fail?', async () => {
      const mockResult = { id: FIRST_ID, name: 'test' };
      const mockPromise = Promise.resolve(mockResult);

      await expect(
        service.throwDuplicateError(mockPromise, mockResult),
      ).resolves.toEqual(mockResult);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
