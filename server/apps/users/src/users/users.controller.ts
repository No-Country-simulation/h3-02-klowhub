
import { BadGatewayException, BadRequestException, Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    Req,
 } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserEntity } from 'src/entities/user.entity';
import { JwtService } from "@nestjs/jwt";
import { ProfileSuccess } from "./types/interfaces";

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    @HttpCode(HttpStatus.OK)
    @Get('profile')
    async profile(@Req() req: Request) {
        Logger.log('Recibiendo peticion profile')
        try{
            const resp = await this.usersService.findUserById(req)
            return resp as unknown as Promise<ProfileSuccess>;
        }catch(error){
            Logger.error(error)
            return {
                succes: false,
                messager: 'Error en la autenticación'
            }
        }
    }
    @Get(':id')
    async prifile(@Param('id') id: string) {
        Logger.log('Recibiendo peticion profile')      
        try{
            const resp = await this.usersService.findUserByIdUnAuthorized(id)
            return resp as unknown as Promise<ProfileSuccess>;
        }catch(error){
            Logger.error(error)
            return {
                succes: false,
                messager: 'Error en la autenticación'
            }
        }
    }
    
    

    // profile user
    // @MessagePattern({ cmd: 'getProfile' })
    // async getProfile(data: { userId: string }) {
    //     const { userId } = data
    //     try {

    //         const result = await this.usersService.findUserById(userId)
    //         return result
    //     } catch (error) {
    //         throw new RpcException({
    //             statusCode: 500,
    //             message: error.message || 'Error al obtener el perfil'
    //         })
    //     }

    // }

    // @MessagePattern({ cmd: 'changeMode' })
    // async changeMode(data: { userId: string; mode: string }) {
    //     const { userId, mode } = data;
    //     console.log(userId)
    //     try {
    //         console.log('esto quiero pasarle', mode)
    //         const changUser = await this.usersService.changeUserRole(userId, mode);
    //         return changUser
    //     } catch (error) {
    //         throw new RpcException({
    //             statusCode: 500,
    //             message: error.message || 'Error al obtener el perfil'
    //         })
    //     }
    // }
}

function SearchUserByID(userId: string) {
    throw new Error("Function not implemented.");
}
