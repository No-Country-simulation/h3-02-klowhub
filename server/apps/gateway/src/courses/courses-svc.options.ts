import { join } from 'path'
import { Transport, ClientOptions } from '@nestjs/microservices'

export const CoursesServiceClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.COURSES_SVC_URL}:${process.env.COURSES_SVC_PORT}`,
    package: 'courses',
    protoPath: join(__dirname, '../../_proto/courses.proto'),
    loader: {
      enums: String,
      objects: true,
      arrays: true
    }
  }
}
