import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
//import { MatchPassword } from 'src/decorators/matchPassword.decorators';

export class UsersDto {

  @ApiProperty({
    description: 'propiedad name',
    example: 'rafael'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;


  @ApiProperty({
    description: 'propiedad email',
    example: 'rorozco@gmail.com'
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  email: string;

  @ApiProperty({
    description: 'propiedad password',
    example: '1234'
  })
  
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;


  @ApiProperty({
    description: 'propiedad confirmPassword',
    example: '1234'
  })
  @IsString()
  @IsNotEmpty()
 // @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({
    description: 'propiedad phone',
    example: '3003001794'
  })
  @IsNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'propiedad country',
    example: 'colombia'
  })
  @IsString()
  country: string;


  @ApiProperty({
    description: 'propiedad address',
    example: 'soledad barranquilla call 54 28#90'
  })
  @IsString()
  address?: string | undefined;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;

  @ApiProperty({
    description: 'propiedad city',
    example: 'barranquilla'
  })
  @IsString()
  city?: string | undefined;

  @ApiHideProperty()
  createdAt?: string | undefined;
}