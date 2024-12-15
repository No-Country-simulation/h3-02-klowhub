// apps/courses/src/users/users.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../courses/schemas/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import {ConfigEnvs } from '../config/envs'

@Module({
  imports: [
    JwtModule.register({
      secret: ConfigEnvs.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  providers:[UsersService],
  controllers:[UsersController],
  exports:[UsersService, MongooseModule]
})
export class UsersModule {}
