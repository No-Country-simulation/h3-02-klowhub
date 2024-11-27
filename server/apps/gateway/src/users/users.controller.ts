import {
    Request,
    Controller,
    Post,
    Body,
    Inject,
    BadRequestException,
    Patch,
    Response,
    Get,
    UseGuards,
    Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CookieService } from 'src/common/services/cookie.service';
import { Response as ExpressResponse } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ModeDto, ModeSchema } from './dto/mode.Shcema'

@Controller('users')
export class UsersController {
    constructor(
        @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
        private readonly cookieService: CookieService,
    ) { }
    // profile user
    @Get('profile')
    @Roles('admin', 'user', 'creator', 'moderator') // Roles permitidos
    @UseGuards(RolesGuard) // Verifica el rol del usuario
    async getProfile(@Request() req: any, @Response() res: ExpressResponse) {
        const userId = req.user.id; // Recuperamos el userId desde el token (verificado por el middleware)
        console.log('este es la id del usuario', userId);
        if (!userId) {
            throw new BadRequestException('No se encontró el ID del usuario');
        }
        try {
            // Enviar el userId al microservicio para obtener la información completa del perfil
            const profile = await lastValueFrom(
                this.usersClient.send({ cmd: 'getProfile' }, { userId }), // Enviar userId al microservicio
            );

            // Regresar la información completa del perfil al cliente
            return res.status(200).json(profile);
        } catch (error) {
            throw new BadRequestException(
                error.message || 'Error al obtener el perfil',
            );
        }
    }

    // cambiar rol del usuario
  // Endpoint para cambiar de modo
  @Put('changeMode')
  @Roles('admin', 'user', 'creator', 'moderator') // Roles permitidos para cambiar de modo
  @UseGuards(RolesGuard)
  async changeMode(@Request() req: any, @Body() modeData: any) {
    const userId = req.user.id; // Extraemos el ID del token

    if (!userId) {
      throw new BadRequestException('No se encontró el ID del usuario');
    }
    // Validar los datos con Zod
    const validationResult = ModeSchema.safeParse(modeData);
    if (!validationResult.success) {
      console.error('Validation errors:', validationResult.error.format());
      throw new BadRequestException(validationResult.error.errors);
    }

    const { mode } = validationResult.data;

    try {
      // Enviar la solicitud al microservicio
      return await lastValueFrom(
        this.usersClient.send({ cmd: 'changeMode' }, { userId, mode }),
      );
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error al cambiar el modo del usuario',
      );
    }
  }

}  