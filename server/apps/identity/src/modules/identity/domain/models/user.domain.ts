import { Credentials } from './credentials.domain';
import { AuthProvider } from './authProvider.domain';
import { Base } from '@common/dtos/base.domain';

export class User extends Base {
  email?: string;
  name?: string;
  lastname?: string;
  confirmed?: boolean;
  password?: string;
  credentials?: Credentials;
  providers?: AuthProvider[];
}
