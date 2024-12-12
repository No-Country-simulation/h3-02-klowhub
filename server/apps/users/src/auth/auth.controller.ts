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

dotenv.config();

@Controller('auth')
export class AuthController {
  usersService: any;

  constructor(private readonly authService: AuthService) {}

  // Cambiado de MessagePattern a Post
  @Post('register')
  async register(@Body() data: any) {
    const validationResult = RegisterSchema.safeParse(data);
    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error.errors);
    }
    const registerDto: RegisterDto = validationResult.data;
    return this.authService.registerUser(registerDto);
  }

  @Post('verifyEmail')
  async verifyEmail(@Body() data: any) {
    const validationToken = TokenSchema.safeParse(data);
    if (!validationToken.success) {
      throw new BadRequestException(validationToken.error.errors);
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

  @Patch('update')
  async updateUser(
    @Body('userId') userId: string,
    @Body() data: Partial<UserEntity>,
  ) {
    const updatedUser = await this.usersService.updateUser(userId, data);
    return { message: 'Usuario actualizado', updatedUser };
  }

  @Post('login')
  async login(@Body() data: any) {
    console.log('Enviando solicitud al microservicio de USERS:', data);
    const validateLogin = LoginSchema.safeParse(data);
    if (!validateLogin.success) {
      throw new BadRequestException(validateLogin.error.errors);
    }
    const loginDto: LoginDto = validateLogin.data;
    return this.authService.login(loginDto);
  }

  @Post('resetToken')
  async resendVerificationToken(@Body() data: any) {
    const validationEmail = ResetTokenSchema.safeParse(data);
    if (!validationEmail.success) {
      throw new BadRequestException(validationEmail.error.errors);
    }
    const resetTokenDto: ResetTokenDto = validationEmail.data;
    return await this.authService.resendVerificationToken(resetTokenDto.email);
  }

  @Post('resendPasswordEmail')
  async requestPasswordReset(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('El email es obligatorio.');
    }
    await this.authService.requestPasswordReset(email);
    return { message: 'Correo de restablecimiento de contraseña enviado.' };
  }

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