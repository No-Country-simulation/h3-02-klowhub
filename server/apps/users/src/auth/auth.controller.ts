import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Get,
  Req,
  Patch,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterSchema } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/entities/user.entity';
import { Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

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
  //
  @Post('login')
  @HttpCode(HttpStatus.OK) // Retornar 200 OK
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response, // Permite manejar cookies con NestJS
  ): Promise<{ message: string }> {
    return this.authService.login(email, password, res);
  }
  //
  /**
   * Solicitar un nuevo token de verificación.
   * @param email El correo electrónico del usuario.
   */
  @Post('resend-verification-token')
  async resendVerificationToken(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('El email es obligatorio.');
    }
    await this.authService.resendVerificationToken(email);
    return { message: 'Nuevo token de verificación enviado a tu correo.' };
  }

  /**
   * Solicitar restablecer la contraseña.
   * @param email El correo electrónico del usuario.
   */
  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('El email es obligatorio.');
    }
    await this.authService.requestPasswordReset(email);
    return { message: 'Correo de restablecimiento de contraseña enviado.' };
  }

  /**
   * Restablecer la contraseña.
   * @param data Datos del usuario, incluyendo el token y la nueva contraseña.
   */
  @Post('reset-password')
  async resetPassword(
    @Body() data: { email: string; token: string; newPassword: string },
  ) {
    const { email, token, newPassword } = data;

    if (!email || !token || !newPassword) {
      throw new BadRequestException(
        'Email, token y nueva contraseña son obligatorios.',
      );
    }

    await this.authService.resetPassword(email, token, newPassword);
    return { message: 'Contraseña restablecida exitosamente.' };
  }
}
