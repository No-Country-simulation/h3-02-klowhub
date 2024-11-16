import { GrpcOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const coursessGrcpClient: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:3002`,
      package: 'courses',       
      protoPath: join(__dirname, '../_proto/courses.proto'),
    },
  };