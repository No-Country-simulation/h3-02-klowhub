import { BadGatewayException, BadRequestException, Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import { ModeDto, ModeSchema } from "./dto/mode.Shcema";
import { UserEntity } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    // profile user
    @MessagePattern({ cmd: 'getProfile' })
    async getProfile(data: { userId: string }) {
        const { userId } = data
        try {

            const result = await this.usersService.findUserById(userId)
            return result
        } catch (error) {
            throw new RpcException({
                statusCode: 500,
                message: error.message || 'Error al obtener el perfil'
            })
        }

    }

    @MessagePattern({ cmd: 'changeMode' })
    async changeMode(data: { userId: string; mode: string }) {
        const { userId, mode } = data;
        console.log(userId)
        try {
            console.log('esto quiero pasarle', mode)
            const changUser = await this.usersService.changeUserRole(userId, mode);
            return changUser
        } catch (error) {
            throw new RpcException({
                statusCode: 500,
                message: error.message || 'Error al obtener el perfil'
            })
        }
    }
}

function SearchUserByID(userId: string) {
    throw new Error("Function not implemented.");
}
