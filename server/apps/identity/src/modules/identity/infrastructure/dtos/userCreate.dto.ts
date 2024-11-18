import { IsString, Length } from 'class-validator';
import { CredentialDto } from './credential.dto';
import { IDENTITY_VAL_ERRORS } from '../../domain/constants/messages';

export class UserCreateDto extends CredentialDto {
  @IsString({ message: IDENTITY_VAL_ERRORS.NAME_REQUIRED })
  @Length(1, 60, { message: IDENTITY_VAL_ERRORS.NAME_LENGTH })
  name: string;
  @IsString({ message: IDENTITY_VAL_ERRORS.LASTNAME_REQUIRED })
  @Length(1, 60, { message: IDENTITY_VAL_ERRORS.LASTNAME_LENGTH })
  lastname: string;
}
