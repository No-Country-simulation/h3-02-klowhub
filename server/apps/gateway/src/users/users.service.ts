import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigEnvs } from "src/config/envs";
import { handleAxiosError } from '../utils/axios-error.util';

@Injectable()
export class UsersService {
    private readonly userServiceUrl = `${ConfigEnvs.USERS_MICROSERVICE_URL}`;

    constructor(
        private readonly httpService: HttpService,
        private readonly jwtService: JwtService,
    ) { }

    async profile(token: string): Promise<any> {
        try {
            Logger.log('Peticion Profile')
            const response = await this.httpService
                .get(`${this.userServiceUrl}/users/profile`,
                    {
                        headers:{
                            Authorization: `Bearer ${token}`,
                        }
                    }
                )
                .toPromise();
            return response.data;
            
        } catch (error) {
            Logger.error('Error in profile service', error.message);
            // Extrae información útil del error para no incluir estructuras cíclicas
            if (error.response) {
              return {
                status: error.response.status,
                message: error.response.data,
              };
            }
            return { message: 'Error al conectarse al Microservicio Users' };
          }
    }
    async profileAll(userId: string): Promise<any> {
        try {
            Logger.log('Peticion Profile')
            const response = await this.httpService
                .get(`${this.userServiceUrl}/users/profile/${userId}`)
                .toPromise();
            return response.data;
            
        } catch (error) {
            Logger.error('Error in profileAll service', error.message);
           
            if (error.response) {
              return {
                status: error.response.status,
                message: error.response.data,
              };
            }
            return { message: 'Error al conectarse al Microservicio Users' };
          }
    }
}