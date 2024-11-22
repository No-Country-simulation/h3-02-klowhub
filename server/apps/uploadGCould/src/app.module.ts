import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleCloudStorageService } from './storage.service';
import { StorageController } from './storage.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [StorageController],
  providers: [GoogleCloudStorageService],
})
export class GoogleCloudStorageModule  {}