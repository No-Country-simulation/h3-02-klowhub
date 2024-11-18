import { Test, TestingModule } from '@nestjs/testing';
import { SuscriptoController } from './suscripto.controller';

describe('SuscriptoController', () => {
  let controller: SuscriptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuscriptoController],
    }).compile();

    controller = module.get<SuscriptoController>(SuscriptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
