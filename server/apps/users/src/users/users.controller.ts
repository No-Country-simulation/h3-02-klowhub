import {
    BadRequestException,
    Controller,
    Get,
    Post,
    Body,
    Param,
    InternalServerErrorException,
  } from "@nestjs/common";
  import { UsersService } from "./users.service";
  import { ModeDto } from "./dto/mode.Shcema";
  import { UserEntity } from 'src/entities/user.entity';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    // Obtener perfil del usuario por su ID
    @Get(':userId/profile')
    async getProfile(@Param('userId') userId: string): Promise<UserEntity> {
      try {
        const result = await this.usersService.findUserById(userId);
        return(result as UserEntity);
      } catch (error) {
        throw new InternalServerErrorException(
          error.message || 'Error al obtener el perfil del usuario',
        );
      }
    }
  
    // Cambiar el modo de un usuario
    @Post(':userId/mode')
    async changeMode(
      @Param('userId') userId: string,
      @Body() modeDto: ModeDto,
    ): Promise<UserEntity> {
      const { mode } = modeDto;
      try {
        console.log('Usuario:', userId, 'Modo:', mode);
        const updatedUser = await this.usersService.changeUserRole(userId, mode);
        return updatedUser;
      } catch (error) {
        throw new BadRequestException(
          error.message || 'Error al cambiar el modo del usuario',
        );
      }
    }
  }