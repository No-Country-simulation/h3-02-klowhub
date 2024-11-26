import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface PubSubServiceClient {
  test(request: {}): Observable<{ message: string }>;
  listenForMessages(request: { subscriptionName: string }): Observable<{ status: string, message: string }>;
}

@Injectable()
export class PubSubGatewayService {
  private pubSubService: PubSubServiceClient;

  constructor(@Inject('PUBSUB_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.pubSubService = this.client.getService<PubSubServiceClient>('PubSubService');
  }
t
  async test() {
    const result = await this.pubSubService.test({}).toPromise();
    return result.message;
  }

  async listenForMessages(subscriptionName: string) {
    const result = await this.pubSubService.listenForMessages({ subscriptionName }).toPromise();
    return result;
  }
}