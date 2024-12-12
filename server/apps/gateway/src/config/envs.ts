import * as dotenv from 'dotenv';
import { env } from 'process';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

export class ConfigEnvs {
  static PORT = process.env.PORT || 3000; // Default to 3000 if not provided
  static NODE_ENV = process.env.NODE_ENV || 'development';
  static JWT_SECRET = process.env.JWT_SECRET;
  static MONGO_URI = process.env.MONGO_URI;
  static USERS_MICROSERVICE_HOST = process.env.USERS_MICROSERVICE_HOST || 'localhost'; // Default to localhost if not provided
  static USERS_MICROSERVICE_PORT = process.env.USERS_MICROSERVICE_PORT || 3001; // Default to 3001 if not provided
  static COURSES_MICROSERVICE_HOST = process.env.COURSES_MICROSERVICE_HOST || 'localhost'; // Default to localhost if not provided
  static COURSES_MICROSERVICE_PORT = process.env.COURSES_MICROSERVICE_PORT || 3002; // Default to 3002 if not provided
  static UPLOAD_MICROSERVICE_HOST = process.env.UPLOAD_MICROSERVICE_HOST || 'localhost'; // Default to localhost if not provided
  static UPLOAD_SERVICE_PORT = process.env.UPLOAD_SERVICE_PORT || 3003; // Default to 3003 if not provided
  static FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080'; // Default to http://localhost:8080 if not provided
}

console.log('Variables de entorno GateWay:', env);