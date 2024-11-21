import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';  // Importamos el módulo de cursos
import { LeccionesModule } from './lecciones/lecciones.module';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    CoursesModule,
    LeccionesModule
  ],
})
export class AppModule {}
