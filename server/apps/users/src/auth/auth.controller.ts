// src/users/users.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterSchema } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: any) {
    // Validamos los datos de la solicitud utilizando Zod
    const validationResult = RegisterSchema.safeParse(registerDto);
    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error.errors); // Lanzamos un error si la validación falla
    }

    return this.authService.registerUser(registerDto); // Registramos al usuario
  }
  //
  @Post('verify-email')
  async verifyEmail(@Body('token') token: string): Promise<any> {
    try {
      await this.authService.verifyEmailToken(token); // Llama al servicio que valida el token
      return { message: 'Email verified successfully' }; // Retorna mensaje de éxito
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException('Invalid or expired token'); // Si algo falla, lanza una excepción
    }
  }
}
