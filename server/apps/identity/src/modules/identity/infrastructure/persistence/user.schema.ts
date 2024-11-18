import { User } from '@/modules/identity/domain/models/user.domain';
import { EntitySchema } from 'typeorm';
import { CredentialsEmbeddableSchema } from './credential.embeddable.schema';
import { baseColumnSchemas, defaultColumnValue } from '@common/persistence/base.schema';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    ...baseColumnSchemas,
    name: {
      name: 'name',
      type: 'varchar',
      nullable: false,
      length: 80,
      default: defaultColumnValue
    },
    email: {
      name: 'email',
      type: 'varchar',
      nullable: false,
      length: 128,
      unique: true,
      default: defaultColumnValue
    },
    password: {
      name: 'password',
      type: 'varchar',
      nullable: true,
      length: 60,
      default: defaultColumnValue
    },
    confirmed: {
      name: 'confirmed',
      type: 'boolean',
      nullable: false,
      default: false,
    },
  },
  embeddeds: {
    credentials: {
      prefix: 'creds',
      schema: CredentialsEmbeddableSchema,
    },
  },
  uniques: [
    {
      name: 'UNIQUE_EMAIL',
      columns: ['email'],
    },
  ],
  relations: {
    providers: {
      type: 'one-to-many',
      target: 'AuthProvider',
      inverseSide: 'user',
      cascade: true,
    },
  },
});
