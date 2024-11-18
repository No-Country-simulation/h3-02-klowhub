import { EntitySchemaColumnOptions } from 'typeorm';

export const columnDateType =
  process.env.NODE_ENV === 'automated_tests' ? 'date' : 'timestamp with time zone';
export const columnEnumType =
  process.env.NODE_ENV === 'automated_tests' ? 'varchar' : 'enum';

export const defaultColumnValue =
  process.env.NODE_ENV !== 'production' ? `UNSET` : undefined;  

export const baseColumnSchemas: { [key: string]: EntitySchemaColumnOptions } = {
  id: {
    name: 'id',
    type: 'uuid',
    primary: true,
    generated: 'uuid',
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
};
