import { TokenTypeEnum } from '../enums/tokenTypes.enum';
import {
  AccessPayload,
  AccessToken,
  EmailPayload,
  EmailToken,
  RefreshPayload,
  RefreshToken,
} from '../models/token.model';
import { User } from '../models/user.domain';

export abstract class CustomJwtService {
  protected abstract generateTokenAsync(
    payload: AccessPayload | EmailPayload | RefreshPayload,
    options: unknown,
  ): Promise<string>;
  protected abstract verifyTokenAsync<T extends object>(
    token: string,
    options: unknown,
  ): Promise<T>;
  protected abstract throwBadRequest<
    T extends AccessToken | RefreshToken | EmailToken,
  >(promise: Promise<T>): Promise<T>;
  public abstract generateToken(
    user: User,
    tokenType: TokenTypeEnum,
    domain?: string | null,
    tokenId?: string,
  ): Promise<string>;
  public abstract verifyToken<
    T extends AccessToken | RefreshToken | EmailToken,
  >(token: string, tokenType: TokenTypeEnum): Promise<T>;
  public abstract generateAuthTokens(
    user: User,
    domain?: string,
    tokenId?: string,
  ): Promise<[string, string]>;
}
