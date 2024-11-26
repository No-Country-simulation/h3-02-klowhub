import { BadGatewayException, Controller } from "@nestjs/common";
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
        const { userId } = data;
        console.log(userId)
        try{
    
            const result = await this.usersService.findUserById(userId)
            return result
        }catch(error){
            throw new RpcException({
                statusCode: 500,
                message: error.message || 'Error al obtener el perfil'
            })
        }
       
    }

    @MessagePattern({ cmd: 'changeMode' })
    async changeMode(data:any){
        const { userId } = data.userId;
        try {
            const user = await this.usersService.findUserById(userId);
            if (!user){
                throw new RpcException({
                    message: 'Usuario no encontrado',
                    statusCode: 404,
                })
            }
            const validateModo = ModeSchema.safeParse(data);
            if (!validateModo.success) {
                throw new RpcException({
                    statusCode: 400,
                    message: validateModo.error.errors,
                });
            }
            const modoDto: ModeDto = validateModo.data;
            return await this.usersService.updateMode(userId, modoDto);

        }catch(error){
            throw new RpcException({
                status: 500,
                message: error.message || 'Error al cambiar de Modo'
            });
        }
    }
}

function SearchUserByID(userId: string) {
    throw new Error("Function not implemented.");
}
