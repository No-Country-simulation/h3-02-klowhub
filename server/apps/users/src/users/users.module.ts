import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [],
  controllers: [UsersController]
})
export class UsersModule {}
