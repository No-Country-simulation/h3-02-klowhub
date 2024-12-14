import { Controller, Get, Request } from '@nestjs/common';
import { ConfigEnvs } from './config/envs';
import { JwtService } from '@nestjs/jwt';

@Controller('')
export class GatewayController {
  //
  constructor(
      private readonly jwtService: JwtService,
    ) { }
  //
  @Get("")
  getHello(): string {
    return 'GateWay Run ... API Klowhub !';
  }
  // ruta test token
  @Get('debug-token')
async debugToken(@Request() req: any) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { status: false, message: 'Token no proporcionado o formato inválido' };
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = this.jwtService.verify(token, {
      secret: ConfigEnvs.JWT_SECRET,
    });
    return {
      status: true,
      decoded
    };
  } catch (error) {
    return {
      status: false,
      message: error.message
    };
  }
}

}
