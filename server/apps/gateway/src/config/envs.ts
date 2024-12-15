import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { env } from 'process';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

export class ConfigEnvs {
  static PORT = process.env.PORT;
  static NODE_ENV = process.env.NODE_ENV || 'development';
  static JWT_SECRET = process.env.JWT_SECRET;
  static MONGO_URI = process.env.MONGO_URI;
  static USERS_MICROSERVICE_URL = process.env.USERS_MICROSERVICE_URL;
  static COURSES_MICROSERVICE_URL = process.env.COURSES_MICROSERVICE_URL;
  static UPLOAD_MICROSERVICE_URL = process.env.UPLOAD_MICROSERVICE_URL;
  static FRONTEND_URL = process.env.FRONTEND_URL;
}

Logger.log('Variables de entorno GateWay:', env);