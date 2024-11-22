import { IsString, IsNotEmpty, IsNumber, Min} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
  
  @IsString()
  @IsNotEmpty()
  userId:string;
  
  @IsNumber()
  @Min(0)
  price:number;
  
  @IsString()
  plataforma:string;

  @IsString()
  reputacion:string;

  @IsString()
  fotoCurso:string;

  @IsString()
  tags:string;
 
}
