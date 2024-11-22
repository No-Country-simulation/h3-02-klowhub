import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL, // Cadena de conexión
  synchronize: true, // No usar en producción esto es para que migre automaticamente
  entities: [__dirname + '/../**/*.entity.{ts,js}'], // Cargar todas las entidades automáticamente
  migrations: [__dirname + '/../migrations/*.{ts,js}'], // Directorio de migraciones
  logging: true, // Muestra las consultas SQL
};
