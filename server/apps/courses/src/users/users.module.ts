// apps/courses/src/users/users.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../courses/schemas/users.schema';  // Asegúrate de tener el esquema correcto

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  exports: [MongooseModule],  // Exportamos para que esté disponible en otros módulos
})
export class UsersModule {}
