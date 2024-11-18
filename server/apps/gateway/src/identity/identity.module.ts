import { Module } from '@nestjs/common';

import { ClientsModule } from '@nestjs/microservices';
import { IdentityServiceClientOptions } from './identity-svc.options';
import { IdentityController } from './identity.controller';

@Module({
  imports: [
    ClientsModule.register([{name: "IDENTITY_PACKAGE", ...IdentityServiceClientOptions}]),
  ],
  controllers: [IdentityController],
})
export class IdentityModule {}
