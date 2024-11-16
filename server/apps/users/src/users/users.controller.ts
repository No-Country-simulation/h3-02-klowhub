import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UsersController {

    @GrpcMethod('UsersService', 'GetHello')
    public getHello(): string {
        return 'Hello World!';
    }
}
