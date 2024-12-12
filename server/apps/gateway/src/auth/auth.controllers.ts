import {
  Controller,
  Post,
  Headers,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { extractToken } from 'src/utils/auth.utils';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Get('test')
  async test(@Body() any:any): Promise<any> {
    return this.authService.test(any)
  }

  @Post('register')
  async register(@Body() registerDto: any): Promise<any> {
    return this.authService.register(registerDto)
  }

  @Post('login')
  async login(@Body() LoginDto: any): Promise<any> {
    return this.authService.login(LoginDto)
  }

  @Get('status')
  async status(@Headers('authorization') authHeader: string) {
    const payload = extractToken(authHeader, this.jwtService);
    return {
      status: true,
    }
  }
}
