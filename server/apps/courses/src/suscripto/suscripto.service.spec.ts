import { Test, TestingModule } from '@nestjs/testing';
import { SuscriptoService } from './suscripto.service';

describe('SuscriptoService', () => {
  let service: SuscriptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuscriptoService],
    }).compile();

    service = module.get<SuscriptoService>(SuscriptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
