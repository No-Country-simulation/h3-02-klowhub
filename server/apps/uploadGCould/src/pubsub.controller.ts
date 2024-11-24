import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PubSubService } from './pubsub.service';

@Controller()
export class PubSubController {
  constructor(private readonly pubSubService: PubSubService) {}

  @GrpcMethod('PubSubService', 'Test')
  test(): { message: string } {
    return { message: 'PubSub service is active!' };
  }

  @GrpcMethod('PubSubService', 'ListenForMessages')
  async listenForMessages(data: { subscriptionName: string }): Promise<{ status: string, message: string }> {
    try {
      const result = await this.pubSubService.listenForMessages(data.subscriptionName);
      return { status: 'success', message: result as string };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}