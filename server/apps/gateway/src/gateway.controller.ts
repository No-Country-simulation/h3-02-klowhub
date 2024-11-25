import { Controller, Get } from '@nestjs/common';

@Controller('gateway')
export class GatewayController {
  @Get("/hello")
  getHello(): string {
    return 'Hello from Gateway!';
  }
}
