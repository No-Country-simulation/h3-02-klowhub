import { UUID } from "crypto";

export interface SingleJwt {
  readonly secret: string;
  readonly time: number;
}

export interface AccessTokenPayload {
  readonly sub: UUID;
  readonly email: number;
}

export interface JwtOptions {
  readonly access: SingleJwt;
  readonly confirmation: SingleJwt;
  readonly resetPassword: SingleJwt;
  readonly refresh: SingleJwt;
}
