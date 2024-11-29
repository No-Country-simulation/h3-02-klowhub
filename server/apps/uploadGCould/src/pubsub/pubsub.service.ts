import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PubSub } from '@google-cloud/pubsub';
import { resolve } from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module } from '../schema/module.schema'; // Asegúrate de importar el esquema correcto

@Injectable()
export class PubSubService {
  private readonly pubsub;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel('Module') private readonly moduleModel: Model<Module>, 
  ) {
    this.pubsub = new PubSub({
      projectId: this.configService.get<string>('PROJECT_ID'),
      keyFilename: resolve(process.cwd(), 'gccKey.json'),
    });
  }

  async listenForMessages(subscriptionName: string) {
    const subscription = this.pubsub.subscription(subscriptionName);

    return new Promise((resolve, reject) => {
      subscription.on('message', async (message) => {
        try {
          console.log(`Received message: ${message.data}`);
          const data = JSON.parse(message.data.toString()); // Extraemos los datos del mensaje

          
          const updatedModule = await this.moduleModel.findOneAndUpdate(
            { 'lessons.lessonTitle': data.title }, 
            { $set: { 'lessons.$.videoUrl': data.videoUrl } }, 
            { new: true } 
          );

          if (updatedModule) {
            console.log(`Updated module: ${updatedModule.moduleTitle}`);
          } else {
            console.warn(`Module with lesson title "${data.title}" not found.`);
          }

          message.ack(); // Confirmamos que el mensaje fue procesado
        } catch (e) {
          console.error('Error handling message:', e);
        }
      });

      subscription.on('error', (error) => {
        console.error('Error receiving message:', error);
        reject(error);
      });

      resolve(`Listening for messages on ${subscriptionName}`);
    });
  }
}