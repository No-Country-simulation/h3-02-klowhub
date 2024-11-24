import { Controller, Get, Param } from '@nestjs/common';
import { PubSubGatewayService } from './pubsub.gateway.service';

@Controller('pubsub')
export class PubSubGatewayController {
  constructor(private readonly pubSubGatewayService: PubSubGatewayService) {}

  @Get('test')
  async test() {
    return this.pubSubGatewayService.test();
  }

  @Get('listen/:subscriptionName')
  async listenForMessages(@Param('subscriptionName') subscriptionName: string) {
    return this.pubSubGatewayService.listenForMessages(subscriptionName);
  }
}