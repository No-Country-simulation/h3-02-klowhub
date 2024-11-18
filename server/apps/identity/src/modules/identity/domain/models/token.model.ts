import { UUID } from 'crypto';

export interface TokenBase {
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  sub: string;
}

export interface AccessPayload {
  id: UUID;
}
export interface EmailPayload extends AccessPayload {
  version: number;
}
export interface RefreshPayload extends EmailPayload {
  tokenId: string;
}

export interface EmailToken extends EmailPayload, TokenBase {}
export interface RefreshToken extends RefreshPayload, TokenBase {}
export interface AccessToken extends AccessPayload, TokenBase {}
