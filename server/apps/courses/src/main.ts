import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { coursessGrcpClient } from './grcpCourses-client';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, coursessGrcpClient);

  await app.listen();
  console.log(`Application is running on`);
}
bootstrap();
