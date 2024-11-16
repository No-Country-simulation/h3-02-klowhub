import { GrpcOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const usersGrcpClient: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:3001`,
      package: 'users',       
      protoPath: join(__dirname, '../_proto/users.proto'),
    },
  };