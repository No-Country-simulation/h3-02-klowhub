import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { FirmasModule } from './firmas/firmas.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
@Module({
  imports: [ MongooseModule.forRoot("mongodb+srv://klowhub02:KWEkPK6pAjTxvgTZ@cluster0.s1vuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),
    StorageModule, FirmasModule, PubSubModule],
})
export class AppModule {}