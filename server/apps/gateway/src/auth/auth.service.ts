import { Injectable, Logger, Req } from '@nestjs/common';
import { RegisterDto } from './dto/registerSchema.dto';
import { ConfigEnvs } from '../config/envs';
import { handleAxiosError } from '../utils/axios-error.util';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly userServiceUrl = `${ConfigEnvs.USERS_MICROSERVICE_URL}`;
  
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) { }
  //test
  async test(any: any): Promise<any> {
    try {
      console.log('Peticion Test', ConfigEnvs.USERS_MICROSERVICE_URL)
      const response = await this.httpService
        .get(`${this.userServiceUrl}/auth/test`)
        .toPromise();
      return response.data;
    } catch (error) {
      console.log(error.message);
      return 'Error al conectarse al Microservicio Users';
    }
  }
  //register
  async register(registerDto: RegisterDto): Promise<any> {
    try {
      console.log('Petición Registro microservicio users:', this.userServiceUrl);
      const response = await this.httpService
        .post(`${this.userServiceUrl}/auth/register`, registerDto)
        .toPromise();
      return response.data
    } catch (error) {
      console.error('Error en la llamada al microservicio de usuarios');
      const errorResponse = handleAxiosError(error, 'Error en la llamada al microservicio de usuarios');
      return errorResponse;
    }
  } 
  //Login
  async login(loginDto: any): Promise<any> {
    try {
      console.log('Petición Login microservicio users:', this.userServiceUrl);
      const response = await this.httpService
        .post(`${this.userServiceUrl}/auth/login`, loginDto)
        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Error en la llamada al microservicio de usuarios');
      const errorResponse = handleAxiosError(error, 'Error en la llamada al microservicio de usuarios');
      return errorResponse;
    }
  } 
  //status
  async verifyTokenStatus(req: Request): Promise<any> {
      Logger.log('Verificando estado del token', 'AuthController');
  
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        Logger.warn('Token no proporcionado o formato inválido', 'AuthController');
        return { status: false, message: 'Token no proporcionado o formato inválido' };
      }
  
      const token = authHeader.split(' ')[1];
      Logger.log(`Token recibido: ${token}`, 'AuthController');
  
      if (!token) {
        return { status: false, message: 'Token no proporcionado' };
      }
  
      try {
        this.jwtService.verify(token, { secret: ConfigEnvs.JWT_SECRET });
        return { status: true };
      } catch (error) {
        Logger.error(`Error al verificar el token: ${error.message}`, 'AuthController');
        return { status: false, message: 'Token inválido o expirado' };
      }
    }
}
