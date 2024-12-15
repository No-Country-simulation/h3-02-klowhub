import {
  Controller,
  Post,
  BadRequestException,
  Body,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
  Res,
  Get,
  Logger
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterSchema, RegisterDto } from './dto/registerSchema.dto';
import { formatZodErrors } from 'src/utils/formatZod';
import { LoginDto, LoginSchema } from './dto/loginSchema.dto';
import { Response } from 'express';
import { LoginSuccess } from './types/responseTypes';

@Controller('/auth')
export class AuthController {
  usersService: any;
  constructor(private readonly authService: AuthService) { }

  @Get('test')
  async test(@Body() any:any){
    Logger.log('recibiendo peticion en el test')
    return ({
      message:'Microserver Useres is run'
    })
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() data: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const validationResult = RegisterSchema.safeParse(data);
    if (!validationResult.success) {
      const formattedErrors = formatZodErrors(validationResult.error.errors);
      throw new BadRequestException({
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }
    const registerDto: RegisterDto = validationResult.data;
    try {
      const resp = await this.authService.registerUser(registerDto);
      if (resp?.token) {
        // res.cookie('authToken', resp.token, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === 'production',
        //   sameSite: 'strict',
        //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
        // })
        //
        return resp
      };
      return { 
        success: false, 
        message: 'Error in Register' };
    } catch (error) {
      Logger.error('Error in register process:', error);
      throw new InternalServerErrorException('Registration failed');
    }
  }


  @Post('login')
  async login(@Body() data: LoginDto, @Res({ passthrough: true }) res: Response) {

    const validateLogin = LoginSchema.safeParse(data);
    if (!validateLogin.success) {
      const formattedErrors = formatZodErrors(validateLogin.error.errors);
      //
      return ({
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }
    const loginDto: LoginDto = validateLogin.data;
    try {
      const resp = await this.authService.login(loginDto);
      if(resp?.token){
        //
        // res.cookie('authToken', resp.token, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === 'production',
        //   sameSite: 'strict',
        //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
        // })
        //
        return resp as unknown as Promise<LoginSuccess>;
      } else {
        return {
          success: false,
          message: 'Error en la autenticación',
        };
      }
    } catch (error) {
      Logger.error('Error in login process:', error);
      throw new InternalServerErrorException('Registration failed');
    }
  }
}
  //
  // @Post('verifyEmail')
  // @MessagePattern({ cmd: 'verifyEmail' })
  // async verifyEmail(data: any) {
  //   const validationToken = TokenSchema.safeParse(data);
  //   if (!validationToken.success) {
  //     throw new BadRequestException(validationToken.data);
  //   }
  //   const tokenDto: TokenDto = validationToken.data;
  //   return this.authService.verifyEmailToken(tokenDto);
  // }

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // googleLogin() {
  //   return { message: 'Redirecting to Google...' };
  // }

  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // async googleCallback(@Req() req) {
  //   const user = req.user;
  //   return { message: 'Usuario autenticado con Google', user };
  // }
  // // Actualizar datos del usuario No quitar
  // @Patch('update')
  // async updateUser(
  //   @Body('userId') userId: string,
  //   @Body() data: Partial<UserEntity>,
  // ) {
  //   const updatedUser = await this.usersService.updateUser(userId, data);
  //   return { message: 'Usuario actualizado', updatedUser };
  // }
  // //

// // vuelve a enviar el token de autotificacion
// //@Post('resetToken')
// @MessagePattern({ cmd: 'resetToken' })
// async resendVerificationToken(data: any) {
//   const validationEmail = ResetTokenSchema.safeParse(data);
//   if (!validationEmail.success) {
//     throw new BadRequestException(validationEmail.error.errors);
//   }
//   const resetTokenDto: ResetTokenDto = validationEmail.data;
//   return await this.authService.resendVerificationToken(resetTokenDto.email);
// }

// /**
//  * Solicitar restablecer la contraseña.
//  * @param email El correo electrónico del usuario.
//  */
// @Post('resendPasswordEmail')
// async requestPasswordReset(@Body('email') email: string) {
//   if (!email) {
//     throw new BadRequestException('El email es obligatorio.');
//   }
//   await this.authService.requestPasswordReset(email);
//   return { message: 'Correo de restablecimiento de contraseña enviado.' };
// }

// /**
//  * Restablecer la contraseña.
//  * @param data Datos del usuario, incluyendo el token y la nueva contraseña.
//  */
// @Post('resendPassword')
// async resetPassword(
//   @Body() data: { email: string; token: string; newPassword: string },
// ) {
//   const { email, token, newPassword } = data;

//   if (!email || !token || !newPassword) {
//     throw new BadRequestException(
//       'Email, token y nueva contraseña son obligatorios.',
//     );
//   }

//   await this.authService.resetPassword(email, token, newPassword);
//   return { message: 'Contraseña restablecida exitosamente.' };
// }

