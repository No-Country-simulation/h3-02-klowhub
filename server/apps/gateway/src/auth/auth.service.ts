import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/registerSchema.dto';
import { ConfigEnvs } from '../config/envs';
import { handleAxiosError } from '../utils/axios-error.util';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  private readonly userServiceUrl = `${ConfigEnvs.USERS_MICROSERVICE_HOST}`;
  
  constructor(private readonly httpService: HttpService) { }
  //test
  async test(any: any): Promise<any> {
    try {
      console.log('este es la url', this.userServiceUrl)
      console.log('variable de entorno', ConfigEnvs.COURSES_MICROSERVICE_PORT)
      const response = await this.httpService
        .get(`${this.userServiceUrl}/auth/test`)
        .toPromise();
      return response.data; // Devuelve solo los datos útiles
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
      return response.data;
    } catch (error) {
      console.error('Error en la llamada al microservicio de usuarios');
      const errorResponse = handleAxiosError(error, 'Error en la llamada al microservicio de usuarios');
      return errorResponse;
    }
  } 
  //Login
  async login(loginDto: any): Promise<any> {
    try {
      console.log('Petición microservicio users:', this.userServiceUrl);
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
}
