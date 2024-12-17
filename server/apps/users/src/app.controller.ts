import { Controller, Get } from '@nestjs/common';

@Controller('')
export class UsersController {
  @Get("/users")
  getHello(): string {
    return 'Microserver Users is Run ... API Klowhub !';
  }
}
