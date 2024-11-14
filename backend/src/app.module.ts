import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RatingModule } from './rating/rating.module';
import { ReputacionModule } from './reputacion/reputacion.module';
import { CursosModule } from './cursos/cursos.module';
import { ClasesModule } from './clases/clases.module';

@Module({
  imports: [UsersModule,CursosModule,ClasesModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [typeOrmConfig],
  }), TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      configService.get('typeorm'),
  }), RatingModule, ReputacionModule, CursosModule, ClasesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
