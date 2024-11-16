import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';  // Importamos el módulo de cursos
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './common/configuration';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CoursesModule,
  ],
})
export class AppModule {}
