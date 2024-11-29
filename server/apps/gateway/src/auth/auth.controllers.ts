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
import { Response as ExpressResponse } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
    @Inject('COURSES_SERVICE') private readonly coursesClient: ClientProxy,
    private readonly jwtService: JwtService,
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
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 1000,
      })

      if (newToken) {
        // Intentar emitir el evento al microservicio de cursos sin interrumpir el flujo
        console.log("Enviando solicitud al microservicio de cursos:", { token: newToken });
        await lastValueFrom(
          this.coursesClient.send({ cmd: 'instance' }, { token: newToken }),
        ).catch((err) => {
          console.warn('El microservicio de cursos no está disponible error al crear instancia', err.message);
        });
      }

      // Regresar una respuesta al cliente
      return res.status(200).json({
        message: '¡Correo electrónico verificado y sesión iniciada!',
      });
    } catch (error) {
      // Manejar errores generales del proceso de verificación de correo
      console.error('Error al verificar el correo:', error.message);
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
      // Solicitar el token al microservicio de USERS
      console.log("Enviando solicitud al microservicio de USERS:", loginDto);
      const { token } = await lastValueFrom(
        this.usersService.send({ cmd: 'login' }, loginDto),
      );

      if (!token) {
        throw new BadRequestException('Token no recibido del microservicio de usuarios');
      }

      // Configurar la cookie con el token
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 1000,
      })
      

      // Intentar enviar la solicitud al microservicio de cursos (puede fallar)
      console.log("Enviando solicitud al microservicio de cursos:", { token });
      await lastValueFrom(
        this.coursesClient.send({ cmd: 'instance' }, { token }),
      ).catch((err) => {
        // Manejar errores del microservicio de cursos sin detener el flujo
        console.warn('El microservicio de cursos no está disponible, error al crear instancia', err.message);
      });

      // Responder al cliente con éxito
      return res.status(200).json({
        message: '¡Inicio de sesión exitoso!',
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message); // Registro detallado del error
      throw new BadRequestException(error.message || 'Error al iniciar sesión');
    }
  }
}
