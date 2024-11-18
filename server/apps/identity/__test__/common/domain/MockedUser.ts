import { faker } from '@faker-js/faker/.';
import { UUID } from 'crypto';

import { User } from '@/modules/identity/domain/models/user.domain';

import { DEFAULT_UUID } from './uuidMock';

export const FAKE_USER_EMAIL = faker.internet.email();
export const FAKE_USER_NAME = faker.person.firstName();
export const FAKE_USER_LASTNAME = faker.person.lastName();
export const MOCKED_USER = {
  id: DEFAULT_UUID as UUID,
  email: FAKE_USER_EMAIL,
  name: FAKE_USER_NAME,
  lastname: FAKE_USER_LASTNAME,
  confirmed: true,
  password: undefined,
  credentials: {
    version: 1,
    passwordUpdatedAt: new Date(),
    updatedAt: new Date(),
  },
  providers: undefined,
} as unknown as User;
