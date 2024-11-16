import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('users')
export class UsersController {

    @GrpcMethod('UsersService', 'GetHello')
    public getHello(): { message: string } {
        return { message: 'Hello World!'};
    }
}
