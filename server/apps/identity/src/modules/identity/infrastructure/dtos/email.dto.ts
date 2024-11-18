import { IsEmail, IsString, Length } from 'class-validator';
import { IDENTITY_VAL_ERRORS } from '../../domain/constants/messages';

export abstract class EmailDto {
  @IsString({ message: IDENTITY_VAL_ERRORS.EMAIL_REQUIRED })
  @IsEmail({ message: IDENTITY_VAL_ERRORS.EMAIL_INVALID })
  @Length(5, 255, { message: IDENTITY_VAL_ERRORS.EMAIL_LENGTH })
  public email: string;
}
