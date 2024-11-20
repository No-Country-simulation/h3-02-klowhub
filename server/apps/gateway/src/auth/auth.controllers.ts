import {
  Request,
  Controller,
  Post,
  Body,
  Inject,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RegisterSchema } from './dto/registerSchema.dto';
import { UpdateSchema } from './dto/updateSchema.dto';
import { LoginSchema } from './dto/loginSchema.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientProxy,
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
  async verifyEmail(@Body('token') token: string): Promise<any> {
    return lastValueFrom(
      this.authClient.send({ cmd: 'verifyEmail' }, { token }),
    );
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
  
  @Post('login')
  async login(@Body() loginDto: any): Promise<any> {
    const validationResult = LoginSchema.safeParse(loginDto);
    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error.errors);
    }
    return lastValueFrom(
      this.authClient.send({ cmd: 'login' }, loginDto),
    );
  }
}
