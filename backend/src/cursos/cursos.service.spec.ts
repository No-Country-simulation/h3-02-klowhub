import { Test, TestingModule } from '@nestjs/testing';
import { CursosService } from './cursos.service';

describe('CursosService', () => {
  let service: CursosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CursosService],
    }).compile();

    service = module.get<CursosService>(CursosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
