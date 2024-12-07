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
import { LoginSchema, LoginDto } from './dto/loginSchema.dto';
import { ResetTokenSchema, ResetTokenDto } from './dto/resetToken.dto';
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
    console.log("data",data)
    try {
      const validateLogin = LoginSchema.safeParse(data);
      console.log("validateLogin", validateLogin)
      if (!validateLogin.success) {
        throw new RpcException({
          statusCode: 400,
          message: validateLogin.error.errors,
        });
      }
      const loginDto: LoginDto = validateLogin.data;
      const result = await this.authService.login(loginDto);
      console.log(result)
      return result;
    } catch (error) {
      // Lanzar excepciones específicas para microservicios
      throw new RpcException({
        statusCode: 400,
        message: error.message || 'Ocurrió un error al iniciar sesión',
      });
    }
  }
  // vuelve a enviar el token de autotificacion
  //@Post('resetToken')
  @MessagePattern({ cmd: 'resetToken' })
  async resendVerificationToken(data: any) {
    const validationEmail = ResetTokenSchema.safeParse(data);
    if (!validationEmail.success) {
      throw new BadRequestException(validationEmail.error.errors);
    }
    const resetTokenDto: ResetTokenDto = validationEmail.data;
    return await this.authService.resendVerificationToken(resetTokenDto.email);
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
