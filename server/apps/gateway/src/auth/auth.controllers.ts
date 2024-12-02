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
import { ClientProxy, Client } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RegisterSchema } from './dto/registerSchema.dto';
import { UpdateSchema } from './dto/updateSchema.dto';
import { LoginDto } from './dto/loginSchema.dto';
import { ResetTokenDto, ResetTokenSchema } from './dto/resetToken.dto';
import { CookieService } from 'src/common/services/cookie.service';
import { Response as ExpressResponse } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
    @Inject('COURSES_SERVICE') private readonly coursesClient: ClientProxy,
    private readonly cookieService: CookieService,
    private readonly jwtService: JwtService
  ) { }

  @Post('register')
  async register(@Body() registerDto: any): Promise<any> {
    // Validar los datos con Zod
    const validationResult = RegisterSchema.safeParse(registerDto);
    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error.errors);
    }

    // Enviar los datos al microservicio y manejar el Observable como una Promesa
    return lastValueFrom(
      this.usersService.send({ cmd: 'register' }, registerDto),
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
        this.usersService.send({ cmd: 'verifyEmail' }, { token }),
      );

      // Usar el servicio CookieService para gestionar la cookie con el nuevo token
      this.cookieService.set(res, 'auth_token', newToken, {
        maxAge: 60 * 60 * 1000, // 1 hora
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      if (token) {
        // Emitir el evento para crear la instancia del curso en MongoDB
        console.log("Enviando solicitud al microservicio de cursos:", { token });
        await lastValueFrom(
          this.coursesClient.send({ cmd: 'instance' }, { token }),
        );
      }

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

  // reenviar el token para activar el email
  @Post('resetToken')
  async resertToken(@Body() resetTokenDto: ResetTokenDto): Promise<any> {
    const validationEmail = ResetTokenSchema.safeParse(resetTokenDto);
    if (!validationEmail.success) {
      throw new BadRequestException(validationEmail.error.errors);
    }
    return lastValueFrom(
      this.usersService.send({ cmd: 'resetToken' }, resetTokenDto),
    );
  }
  //
  @Post('google')
  async google(@Body() token: string): Promise<any> {
    return lastValueFrom(this.usersService.send({ cmd: 'google' }, { token }));
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
      this.usersService.send({ cmd: 'google' }, { token, updateDto }),
    );
  }
  //
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Response() res: ExpressResponse) {
    try {
      // Enviar la solicitud al microservicio
      console.log("Enviando solicitud al microservicio de USERS:", loginDto);
      const { token } = await lastValueFrom(
        this.usersService.send({ cmd: 'login' }, loginDto),
      );

      // Usar el servicio CookieService para gestionar la cookie
      res.cookie('auth_token', token, {
        maxAge: 60 * 60 * 1000, // 1 hora
        httpOnly: true, // La cookie no es accesible desde JavaScript
        secure: false, // Usa `false` en HTTP (solo desarrollo)
        sameSite: 'strict', // La cookie solo se puede acceder desde el mismo dominio
        path: '/', // Asegura que esté disponible en todas las rutas
      });
      if (token) {
        // Emitir el evento para crear la instancia del curso en MongoDB
        console.log("Enviando solicitud al microservicio de cursos:", { token });
        await lastValueFrom(
          this.coursesClient.send({ cmd: 'instance' }, { token }),
        );
      }



      // Regresar una respuesta al cliente
      return res.status(200).json({
        message: '¡Inicio de sesión exitoso!',
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error); // Agrega más detalles sobre el error
      throw new BadRequestException(error.message || 'Error al iniciar sesión');
    }
  }

}
