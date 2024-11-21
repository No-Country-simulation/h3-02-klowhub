import { IsString, IsNotEmpty} from 'class-validator';

export class CreateLeccioneDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsString()
    @IsNotEmpty()
    cursoId:string;

    @IsString()
    @IsNotEmpty()
    videos:string;

    @IsString()
    @IsNotEmpty()
    multimedia:string;
   
    @IsString()
    @IsNotEmpty()
    reseña:string;   
}
