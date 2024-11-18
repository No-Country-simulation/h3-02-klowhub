import { Transport, ClientOptions } from '@nestjs/microservices'
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CoursesServiceClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `localhost:3002`,
    package: 'courses',
    protoPath: join(__dirname, '../../_proto/courses.proto'),
    loader: {
      enums: String,
      objects: true,
      arrays: true
    },
  }
}
