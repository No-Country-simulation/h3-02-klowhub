import { Test, TestingModule } from '@nestjs/testing';
import { ClasesService } from './clases.service';

describe('ClasesService', () => {
  let service: ClasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClasesService],
    }).compile();

    service = module.get<ClasesService>(ClasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
