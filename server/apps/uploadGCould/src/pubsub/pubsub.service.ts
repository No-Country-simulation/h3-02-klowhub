import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PubSub } from '@google-cloud/pubsub';
import { resolve } from 'path';

@Injectable()
export class PubSubService {
  private readonly pubsub;

  constructor(private readonly configService: ConfigService) {
    this.pubsub = new PubSub({
      projectId: this.configService.get<string>('PROJECT_ID'),
      keyFilename: resolve(process.cwd(), 'gccKey.json'),
    });
  }

  async listenForMessages(subscriptionName: string) {
    const subscription = this.pubsub.subscription(subscriptionName);

    return new Promise((resolve, reject) => {
      subscription.on('message', (message) => {
        try {
          console.log(`Received message: ${message.data}`);
          message.ack();
        } catch (e) {
          console.log('Error parsing message', e);
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