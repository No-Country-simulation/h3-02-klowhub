import { GrpcOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const usersGrcpClient: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
      url: `127.0.0.1:3001`,
      package: 'users',       
      protoPath: join(__dirname, '../_proto/users.proto'),
    },
  };