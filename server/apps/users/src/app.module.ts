import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './common/configuration';
import { UsersModule } from './users/users.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL as string, // Asegúrate de que DATABASE_URL esté en el archivo .env
      entities: [User], // Asegúrate de que User esté definido correctamente
      synchronize: true, // Sincroniza la base de datos (solo en desarrollo, cuidado en producción)
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
