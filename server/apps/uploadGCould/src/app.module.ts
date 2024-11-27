import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { SignaturesModule } from './signatures/signatures.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';  
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env', 
  }),
  MongooseModule.forRoot(process.env.MONGO_URI), 
    StorageModule, SignaturesModule, PubSubModule],
})
export class AppModule { }