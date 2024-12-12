import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController} from './app.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
