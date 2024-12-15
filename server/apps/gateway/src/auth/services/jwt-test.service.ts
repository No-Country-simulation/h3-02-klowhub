import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTestService {
  constructor(private readonly jwtService: JwtService) {}

  testToken() {
    const token = this.jwtService.sign({ userId: '123', role: 'USER' });
    Logger.log(token);
  }
}
