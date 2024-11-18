import { IsJWT, IsString } from 'class-validator';

import { IDENTITY_VAL_ERRORS } from '@modules/identity/domain/constants/messages';

export abstract class ConfirmEmailDto {
  @IsString({ message: IDENTITY_VAL_ERRORS.CONFIRMATION_TOKEN_INVALID })
  @IsJWT({ message: IDENTITY_VAL_ERRORS.CONFIRMATION_TOKEN_INVALID })
  public confirmationToken!: string;
}
