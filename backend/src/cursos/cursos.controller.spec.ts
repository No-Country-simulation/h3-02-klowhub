import { Test, TestingModule } from '@nestjs/testing';
import { CursosController } from './cursos.controller';

describe('CursosController', () => {
  let controller: CursosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CursosController],
    }).compile();

    controller = module.get<CursosController>(CursosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
