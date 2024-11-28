import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';  // Importamos el módulo de cursos
import * as dotenv from 'dotenv';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,  // Define tu secreto de JWT
      signOptions: { expiresIn: '24h' },  // Opciones para la firma (como la expiración)
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    CoursesModule,
    UsersModule,
  ],
})
export class AppModule {}
