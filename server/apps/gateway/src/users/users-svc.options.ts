import { Transport, ClientOptions } from '@nestjs/microservices'
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
