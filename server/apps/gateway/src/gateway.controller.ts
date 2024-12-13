import { Controller, Get } from '@nestjs/common';

@Controller('')
export class GatewayController {
  @Get("")
  getHello(): string {
    return 'GateWay Run ... API Klowhub !';
  }
}
