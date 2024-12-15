import {
  Body,
  Controller,
  Get,
  Logger,
  Put,
  Request,
  Response,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { AuthorizationToken } from 'src/utils/authorization';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  @Get('profile')
  async profile(@Request() req: any, @Response() res: any) {
    const token = AuthorizationToken(req) as string;

    if (typeof token === 'object') {
      return res.status(401).json(token);
    }

    try {
      const userProfile = await this.usersService.profile(token); 
      return res.json(userProfile);
    } catch (error) {
      Logger.error('Error in profile endpoint', error.message);
    return res
      .status(500)
      .json({ message: 'Error al obtener el perfil del usuario' });
  }
  }
}  