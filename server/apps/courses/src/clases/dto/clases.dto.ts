
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
export class ClasesDto {
    idCurso:string;
    title: string;   
    description: string;
    videoUrl:string[];
    multimedia:string[];
    resena:string;
}