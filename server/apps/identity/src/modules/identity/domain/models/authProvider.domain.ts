import { User } from './user.domain';
import { AuthProvidersEnum } from '../enums/authProvider.enum';

export class AuthProvider {
  readonly provider: AuthProvidersEnum;
  readonly user: User;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  isDeleted?: boolean;
}
