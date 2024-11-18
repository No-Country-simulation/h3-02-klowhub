
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
//import { MatchPassword } from 'src/decorators/matchPassword.decorators';
export class CursosDto {
    title: string;
    description: string;
    contentType: string;
    uploadDate: string;
    clases: string;
}