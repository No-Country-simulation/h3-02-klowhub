import {
  Request,
  Controller,
  Post,
  Body,
  Inject,
  BadRequestException,
  Patch,
  Response,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RegisterSchema } from './dto/registerSchema.dto';
import { UpdateSchema } from './dto/updateSchema.dto';
import { LoginDto } from './dto/loginSchema.dto';
import { CookieService } from 'src/common/services/cookie.service';
import { Response as ExpressResponse } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientProxy,
    private readonly cookieService: CookieService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: any): Promise<any> {
    // Validar los datos con Zod
    const validationResult = RegisterSchema.safeParse(registerDto);
    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error.errors);
    }

    // Enviar los datos al microservicio y manejar el Observable como una Promesa
    return lastValueFrom(
      this.authClient.send({ cmd: 'register' }, registerDto),
    );
  }

  @Post('verifyEmail')
  async verifyEmail(
    @Body('token') token: string,
    @Response() res: ExpressResponse,
  ) {
    try {
      // Enviar la solicitud al microservicio para verificar el token de correo
      const { token: newToken } = await lastValueFrom(
        this.authClient.send({ cmd: 'verifyEmail' }, { token }),
      );

      // Usar el servicio CookieService para gestionar la cookie con el nuevo token
      this.cookieService.set(res, 'auth_token', newToken, {
        maxAge: 60 * 60 * 1000, // 1 hora
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      });

      // Regresar una respuesta al cliente
      return res.status(200).json({
        message: '¡Correo electrónico verificado y sesión iniciada!',
      });
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error al verificar el correo',
      );
    }
  }
  @Post('google')
  async google(@Body() token: string): Promise<any> {
    return lastValueFrom(this.authClient.send({ cmd: 'google' }, { token }));
  }
  @Patch('update')
  async update(@Body() updateDto: any, @Request() req: any): Promise<any> {
    const token = req.cookies.token;
    if (!token) {
      throw new BadRequestException('Token not found in cookies');
    }
    const validationResult = UpdateSchema.safeParse(updateDto);
    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error.errors);
    }
    return lastValueFrom(
      this.authClient.send({ cmd: 'google' }, { token, updateDto }),
    );
  }
  //
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Response() res: ExpressResponse) {
    try {
      // Enviar la solicitud al microservicio
      const { token } = await lastValueFrom(
        this.authClient.send({ cmd: 'login' }, loginDto),
      );

      // Usar el servicio CookieService para gestionar la cookie
      this.cookieService.set(res, 'auth_token', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      });

      // Regresar una respuesta al cliente
      return res.status(200).json({
        message: '¡Inicio de sesión exitoso!',
      });
    } catch (error) {
      throw error;
    }
  }
  // profile user
  @Get('profile')
  @Roles('admin', 'moderator', 'user') // Roles permitidos
  @UseGuards(RolesGuard) // Verifica el rol del usuario
  async getProfile(@Request() req: any, @Response() res: ExpressResponse) {
    const userId = req.user.id; // Recuperamos el userId desde el token (verificado por el middleware)
    console.log('este es la id del usuario', userId);
    if (!userId) {
      throw new BadRequestException('No se encontró el ID del usuario');
    }

    try {
      // Enviar el userId al microservicio para obtener la información completa del perfil
      const profile = await lastValueFrom(
        this.authClient.send({ cmd: 'getProfile' }, { userId }), // Enviar userId al microservicio
      );

      // Regresar la información completa del perfil al cliente
      return res.status(200).json(profile);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error al obtener el perfil',
      );
    }
  }
}
