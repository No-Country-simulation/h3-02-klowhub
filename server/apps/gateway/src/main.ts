import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
  type INestApplication
} from '@nestjs/common';
import { LoggerService } from './common/logger.service';
import { AppExceptionFilter } from './common/exception.filter';
import { ExceptionInterceptor } from './common/interceptors/exception.interceptor';
import { HttpLoggerInterceptor } from './common/interceptors/logger.interceptor';
import { CommonModule } from './common/common.module';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  app.enableShutdownHooks();
  const logger = app.select(CommonModule).get(LoggerService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          messages: Object.values(error.constraints || {}),
        }));
        return new HttpException(
          {
            statusCode: HttpStatus.PRECONDITION_FAILED,
            message: 'Validation failed',
            errors: formattedErrors,
          },
          HttpStatus.PRECONDITION_FAILED,
        );
      },
    }),
  );
  app.useGlobalFilters(new AppExceptionFilter(logger));
  app.useGlobalInterceptors(
    new ExceptionInterceptor(logger),
    new HttpLoggerInterceptor(logger),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap().catch((e)=>{
  console.log("Error al iniciar el servidor");
  console.log(e);
});
