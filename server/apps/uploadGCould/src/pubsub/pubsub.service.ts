import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PubSub } from '@google-cloud/pubsub';
import { resolve } from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LessonDocument } from '../schema/lesson.schema';

@Injectable()
export class PubSubService {
  private readonly pubsub;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel('Lesson') private readonly lessonModel: Model<LessonDocument>,
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
          const data = JSON.parse(message.data.toString()); 

        
          const updatedLesson = await this.lessonModel.findOneAndUpdate(
            { title: data.title }, 
            { $set: { videos: data.videos } }, 
            { new: true } 
          );

          if (updatedLesson) {
            console.log(`Updated lesson: ${updatedLesson.title}`);
          } else {
            console.warn(`Lesson with title "${data.title}" not found.`);
          }

          message.ack();
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