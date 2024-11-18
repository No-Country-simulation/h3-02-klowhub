import { Test, TestingModule } from '@nestjs/testing';
import { ReputacionController } from './reputacion.controller';

describe('ReputacionController', () => {
  let controller: ReputacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReputacionController],
    }).compile();

    controller = module.get<ReputacionController>(ReputacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
