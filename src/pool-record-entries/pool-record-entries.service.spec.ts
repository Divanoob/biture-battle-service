import { Test, TestingModule } from '@nestjs/testing';
import { PoolRecordEntriesService } from './pool-record-entries.service';

describe('PoolRecordEntriesService', () => {
  let service: PoolRecordEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoolRecordEntriesService],
    }).compile();

    service = module.get<PoolRecordEntriesService>(PoolRecordEntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
