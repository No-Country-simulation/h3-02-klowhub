import { Module } from '@nestjs/common';
import { UserPostgresRepository } from './infrastructure/persistence/user.postgres.repository';
import { UserRepository } from './domain/ports/user.repository';
import { IdentityServiceAdapter } from './application/identity.service.adapter';
import { IdentityService } from './domain/ports/identity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './infrastructure/persistence/user.schema';
import { CommonModule } from '@/common/common.module';
import { PassportModule } from '@nestjs/passport';
import { CustomJwtService } from './domain/ports/jwt.service';
import { JwtServiceAdapter } from './infrastructure/adapter/jwt.service.adapter';
import { JwtModule } from '@nestjs/jwt';
import { IdentityController } from './infrastructure/identity.controller';
import { AuthProviderSchema } from './infrastructure/persistence/authproviders.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserSchema, AuthProviderSchema]),
    JwtModule.register({
      global: true,
      signOptions: { algorithm: 'HS256' },
    }),
    CommonModule,
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPostgresRepository,
    },
    {
      provide: IdentityService,
      useClass: IdentityServiceAdapter,
    },
    {
      provide: CustomJwtService,
      useClass: JwtServiceAdapter,
    }
  ],
  controllers: [IdentityController],
  exports: [CustomJwtService, UserRepository, IdentityService]
})
export class IdentityModule {}
