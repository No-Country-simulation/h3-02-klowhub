import { GrpcOptions, Transport } from "@nestjs/microservices";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const identityGrcpClient: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:3003`,
      package: 'identity',       
      protoPath: join(__dirname, '../_proto/identity.proto'),
    },
  };