// import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
// import {
//   IsEmail,
//   IsEmpty,
//   IsNotEmpty,
//   IsNumber,
//   IsString,
//   MaxLength,
//   MinLength,
//   Validate,
// } from 'class-validator';
// import { MatchPassword } from 'src/decorators/matchPassword.decorators';
export class UsersDto {

  name: string;
  email: string;
  password: string;
  cursos: string;

}