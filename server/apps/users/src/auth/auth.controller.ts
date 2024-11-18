// src/users/users.controller.ts
import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Get,
  Req,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterSchema } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  usersService: any;
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    return { message: 'Redirecting to Google...' };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req) {
    const user = req.user;
    return { message: 'Usuario autenticado con Google', user };
  }
  // Actualizar datos del usuario No quitar
  @Patch('update')
  async updateUser(
    @Body('userId') userId: string,
    @Body() data: Partial<UserEntity>,
  ) {
    const updatedUser = await this.usersService.updateUser(userId, data);
    return { message: 'Usuario actualizado', updatedUser };
  }
}
