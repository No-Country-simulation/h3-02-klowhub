import { UUID } from 'crypto';

export class Base {
  id?: UUID;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
