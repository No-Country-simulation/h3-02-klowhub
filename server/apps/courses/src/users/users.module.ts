// apps/courses/src/users/users.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../courses/schemas/users.schema';  // Asegúrate de tener el esquema correcto
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,  // Clave secreta definida en .env
      signOptions: { expiresIn: '24h' },  // Opciones como el tiempo de expiración
    }),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  providers:[UsersService],
  controllers:[UsersController],
  exports:[UsersService, MongooseModule]
})
export class UsersModule {}
