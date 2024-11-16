import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersServiceClientOptions } from './users-svc.options';

@Module({
  imports: [
    ClientsModule.register([{name: "USER_SERVICE", ...UsersServiceClientOptions}]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
