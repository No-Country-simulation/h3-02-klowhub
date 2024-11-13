import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContentModule } from './content/content.module';
import { UsersModule } from './users/users.module';
import { RatingModule } from './rating/rating.module';
import { ReputacionModule } from './reputacion/reputacion.module';

@Module({
  imports: [UsersModule,ContentModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [typeOrmConfig],
  }), TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      configService.get('typeorm'),
  }), ContentModule, RatingModule, ReputacionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
