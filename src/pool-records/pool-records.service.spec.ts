import { Test, TestingModule } from '@nestjs/testing';
import { PoolRecordsService } from './pool-records.service';

describe('PoolRecordsService', () => {
  let service: PoolRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoolRecordsService],
    }).compile();

    service = module.get<PoolRecordsService>(PoolRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
