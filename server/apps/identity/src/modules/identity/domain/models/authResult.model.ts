import { UserSummary } from '@/modules/identity/domain/models/userSummary.model';

export interface AuthResult {
  user: UserSummary;
  accessToken: string;
  refreshToken: string;
}
