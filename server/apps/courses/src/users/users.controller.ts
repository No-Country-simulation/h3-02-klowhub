import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  @MessagePattern({ cmd: 'instance' })
  async createCourseInstance(@Payload() data: { token: string }) {
    const token = data.token; // Asegúrate de que esto es un string
    if (typeof token !== 'string') {
      throw new Error('Invalid token received');
    }
  
    try {
      const decoded = this.jwtService.verify(token); // Aquí se usa el token
      if(decoded){
        const result = this.usersService.createUserIfNotExists(decoded.userId)
        return result
      }
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
