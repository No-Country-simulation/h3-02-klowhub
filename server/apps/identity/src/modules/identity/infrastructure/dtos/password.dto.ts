import { IsString, Length, Matches } from 'class-validator';
import { IDENTITY_VAL_ERRORS } from '../../domain/constants/messages';

//const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d@$&+,:;=?@#|'<>.^*()%!-]{8,}$/;
//const PASSWORD_REGEX_UPPERCASE = /^(?=.*[A-Z])/;
const PASSWORD_REGEX_LOWERCASE = /^(?=.*[a-z])/;
const PASSWORD_REGEX_DIGIT = /^(?=.*\d)/;
const PASSWORD_REGEX_SPECIAL = /^(?=.*[$&+,:;=?@#|'<>.^*()%!-])/;

export abstract class PasswordsDto {
  @IsString({ message: IDENTITY_VAL_ERRORS.PASSWORD_REQUIRED })
  @Length(8, 40, { message: IDENTITY_VAL_ERRORS.PASSWORD_LENGTH })
  @Matches(PASSWORD_REGEX_LOWERCASE, {
    message: IDENTITY_VAL_ERRORS.PASSWORD_LOWERCASE,
  })
  @Matches(PASSWORD_REGEX_DIGIT, {
    message: IDENTITY_VAL_ERRORS.PASSWORD_DIGIT,
  })
  @Matches(PASSWORD_REGEX_SPECIAL, {
    message: IDENTITY_VAL_ERRORS.PASSWORD_SPECIAL,
  })
  public password!: string;
}
