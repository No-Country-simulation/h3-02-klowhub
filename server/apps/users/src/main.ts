import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

console.log({ MICRO_HOST: process.env.USERS_MICROSERVICE_HOST });
console.log({ MICRO_PORT: process.env.USERS_MICROSERVICE_PORT });
console.log({ PG_URL: process.env.POSTGRES_URL });
console.log("Variables", process.env);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: 'GET, POST', // Permite POST
    credentials: true,
  });
  const port = process.env.USERS_MICROSERVICE_PORT || 3000;
  await app.listen(port, () => {
    console.log(`Microservice Users is listening on: http://localhost:${port}`);
  });
}
bootstrap();