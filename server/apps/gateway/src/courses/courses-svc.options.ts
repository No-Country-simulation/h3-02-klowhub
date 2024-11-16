import { join } from 'path'
import { Transport, ClientOptions } from '@nestjs/microservices'

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
    }
  }
}
