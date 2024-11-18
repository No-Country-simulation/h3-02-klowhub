import { EntitySchema } from 'typeorm';
import { Credentials } from '../../domain/models/credentials.domain';
import { columnDateType } from '@common/persistence/base.schema';

export const CredentialsEmbeddableSchema = new EntitySchema<Credentials>({
  name: 'Credentials',
  columns: {
    version: {
      name: 'version',
      type: 'int',
      default: 0,
      nullable: false,
    },
    lastPassword: {
      name: 'last_password',
      type: 'varchar',
      default: '',
      nullable: true,
      length: 60,
    },
    passwordUpdatedAt: {
      name: 'password_update_at',
      type: columnDateType,
      nullable: true,
    },
    updatedAt: {
      name: 'updated_at',
      type: columnDateType,
      nullable: true,
    },
  },
});
