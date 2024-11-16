import { join } from 'path'
import { Transport, ClientOptions } from '@nestjs/microservices'

export const UsersServiceClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `0.0.0.0:3001`,
    package: 'users',
    protoPath: join(__dirname, '../../_proto/users.proto'),
    loader: {
      enums: String,
      objects: true,
      arrays: true
    }
  }
}
