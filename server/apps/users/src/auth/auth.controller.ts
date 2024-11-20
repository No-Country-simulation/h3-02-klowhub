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
import { RegisterSchema, RegisterDto } from './dto/registerSchema.dto';
import { TokenSchema, TokenDto } from './dto/tokenSchema.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/entities/user.entity';
import { LoginSchema, loginDto } from './dto/loginSchema.dto';
import * as dotenv from 'dotenv';
import { MessagePattern, RpcException } from '@nestjs/microservices';
dotenv.config();

@Controller('auth')
export class AuthController {
  usersService: any;
  constructor(private readonly authService: AuthService) {}

  // ya no seria @Post seria @MessagePattern @Post('register')
  @MessagePattern({ cmd: 'register' })
  async register(data: any) {
    // Validamos los datos de la solicitud utilizando Zod
    const validationResult = RegisterSchema.safeParse(data);
    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error.errors); // Lanzamos un error si la validación falla
    }
    //siguiente paso
    const registerDto: RegisterDto = validationResult.data;
    return this.authService.registerUser(registerDto); // Registramos al usuario
  }
  //
  //@Post('verifyEmail')
  @MessagePattern({ cmd: 'verifyEmail' })
  async verifyEmail(data: any) {
    const validationToken = TokenSchema.safeParse(data);
    if (!validationToken.success) {
      throw new BadRequestException(validationToken.data);
    }
    const tokenDto: TokenDto = validationToken.data;
    return this.authService.verifyEmailToken(tokenDto);
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
  //@Post('login')
  @MessagePattern({ cmd: 'login' })
  async loginn(data: any) {
    try {
      // Validar datos con Zod
      const validateLogin = LoginSchema.safeParse(data);
      if (!validateLogin.success) {
        throw new RpcException({
          statusCode: 400,
          message: validateLogin.error.errors,
        });
      }

      // Extraer datos validados
      const _loginDto: loginDto = validateLogin.data;

      // Procesar el inicio de sesión
      const result = await this.authService.login(_loginDto);

      return {
        token: result.token,
        message: result.message,
      };
    } catch (error) {
      // Lanzar excepciones específicas para microservicios
      throw new RpcException({
        statusCode: 400,
        message: error.message || 'Ocurrió un error al iniciar sesión',
      });
    }
  }
  //
  @Post('verifyEmail')
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
  @Post('resendPasswordEmail')
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
  @Post('resendPassword')
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
