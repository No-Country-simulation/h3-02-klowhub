import { Test, TestingModule } from '@nestjs/testing';
import { ReputacionService } from './reputacion.service';

describe('ReputacionService', () => {
  let service: ReputacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReputacionService],
    }).compile();

    service = module.get<ReputacionService>(ReputacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
