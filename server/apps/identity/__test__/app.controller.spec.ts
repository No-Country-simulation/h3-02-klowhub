import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppController } from '@/app.controller';
import { AppModule } from '@/app.module';

import {
  MOCK_PORT,
  mockConfigService,
} from './configuration/mockConfiguration';

describe('AppController', () => {
  let app: NestFastifyApplication;
  let configService: ConfigService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    configService = moduleRef.get<ConfigService>(ConfigService);
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  describe('GET /', () => {
    it('should return server running message with port', async () => {
      await request(app.getHttpServer())
        .get('/')
        .expect(HttpStatus.OK)
        .expect(`Server running on ${MOCK_PORT}`);
    });

    it('should call configService.get with correct parameter', async () => {
      await request(app.getHttpServer()).get('/');
      expect(configService.get).toHaveBeenCalledWith('server.port');
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
