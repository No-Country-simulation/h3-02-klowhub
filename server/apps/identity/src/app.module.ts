import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configuration } from '@configuration/configuration';
import { configurationValidate } from '@configuration/configuration.validate';
import { datasourceOptions } from '@configuration/orm.configuration';

import { CommonModule } from '@/common/common.module';

import { DataSource } from 'typeorm';
import { IdentityModule } from './modules/identity/identity.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationValidate,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasourceOptions,
        autoLoadEntities: true,
      }),
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
    CommonModule,
    IdentityModule
  ]
})
export class AppModule {}
