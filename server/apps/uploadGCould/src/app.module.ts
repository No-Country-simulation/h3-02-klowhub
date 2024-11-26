import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleCloudStorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { PubSubController } from './pubsub.controller';
import { PubSubService } from './pubsub.service';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [StorageController,PubSubController],
  providers: [GoogleCloudStorageService,PubSubService],
})
export class GoogleCloudStorageModule  {}