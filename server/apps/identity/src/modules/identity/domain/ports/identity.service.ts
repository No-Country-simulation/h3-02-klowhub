import { ServiceApiResponse } from '@common/interfaces/api-response.dto';
import { AuthResult } from '../models/authResult.model';

export abstract class IdentityService {
  abstract signin(
    email: string,
    password: string,
    domain: string | undefined,
  ): Promise<AuthResult>;
  abstract signup(
    email: string,
    password: string | undefined,
    name: string,
    lastname: string,
    domain: string | undefined,
  ): Promise<unknown>;
  abstract refreshTokenAccess(
    refreshToken: string,
    domain: string | undefined,
  ): Promise<AuthResult>;
  abstract logout(refreshToken: string): Promise<undefined>;
  abstract confirmEmail(
    confirmationToken: string,
    domain: string | undefined,
  ): Promise<AuthResult>;
  abstract verifyToken(accessToken: string): Promise<{isValid: boolean, id: string}>;
}
