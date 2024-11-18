import { Repository } from 'typeorm';

import { Base } from '@/common/domain/models/base.domain';

export const mockRepository = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
} as unknown as Partial<Repository<Base>>;
