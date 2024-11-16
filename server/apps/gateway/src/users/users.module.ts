import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
})
export class UsersModule {}
