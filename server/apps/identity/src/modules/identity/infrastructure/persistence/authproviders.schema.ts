import { EntitySchema } from 'typeorm';
import { AuthProvidersEnum } from '../../domain/enums/authProvider.enum';
import { AuthProvider } from '../../domain/models/authProvider.domain';
import { columnDateType, columnEnumType } from '@common/persistence/base.schema';


export const AuthProviderSchema = new EntitySchema<AuthProvider>({
  name: 'AuthProvider',
  tableName: 'auth_providers',
  columns: {
    provider: {
      type: columnEnumType,
      primary: true,
      enum: AuthProvidersEnum,
      enumName: 'auth_providers_enum',
      default: AuthProvidersEnum.LOCAL,
    },
    createdAt: {
      name: 'created_at',
      type: columnDateType,
      createDate: true,
      nullable: false,
    },
    updatedAt: {
      name: 'updated_at',
      type: columnDateType,
      updateDate: true,
      nullable: false,
    },
    isDeleted: {
      name: 'is_deleted',
      type: 'boolean',
      default: false,
    },
  },
  uniques: [
    {
      name: 'unique_provider_user',
      columns: ['provider', 'user'],
    },
  ],
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      primary: true,
      nullable: false,
      joinColumn: {
        name: 'user_id',
        referencedColumnName: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
});
