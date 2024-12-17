import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  Req,
  Res,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Get('test')
  async test(@Body() any: any): Promise<any> {
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

  @Post('status')
  async status(@Req() req: Request): Promise<{ status: boolean; message?: string }> {
    return this.authService.verifyTokenStatus(req)
  }

  // @Post('logout')
  // async logoutt(@Req() req: Request, @Res() res: Response): Promise<any> {
  //   try {
  //     return this.authService.logoutSeccion(req);
  //   } catch (error) {
  //     Logger.error('Error en el controlador de logout', error.message);
  //     return { message: 'Error al cerrar sesión' };
  //   }
  // }
}
