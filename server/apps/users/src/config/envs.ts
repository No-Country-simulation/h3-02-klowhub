import * as dotenv from 'dotenv';
import { env } from 'process';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

export class ConfigEnvs {
  static NODE_ENV = process.env.NODE_ENV;
  static JWT_SECRET = process.env.JWT_SECRET;
  static USERS_MICROSERVICE_HOST = process.env.USERS_MICROSERVICE_HOST;
  static USERS_MICROSERVICE_PORT = process.env.USERS_MICROSERVICE_PORT;
  static FRONTEND_URL = process.env.FRONTEND_URL;
  static SMTP_USER = process.env.SMTP_USER;
  static SMTP_PASS = process.env.SMTP_PASS;
  static SMTP_HOST = process.env.SMTP_HOST;
  static SMTP_PORT = process.env.SMTP_PORT;
  static SMTP_SECURE = process.env.SMTP_SECURE === 'true';
  static GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  static GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  static GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
  static POSTGRES_URL = process.env.POSTGRES_URL;
  static MONGO_URI = process.env.MONGO_URI;
}

console.log('Variables de entorno microservicio users:', env);
