import { Test, TestingModule } from '@nestjs/testing';
import { PoolRecordEntriesResolver } from '../pool-record-entries.resolver';
import { PoolRecordEntriesService } from '../pool-record-entries.service';

describe('PoolRecordEntriesResolver', () => {
  let resolver: PoolRecordEntriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoolRecordEntriesResolver, PoolRecordEntriesService],
    }).compile();

    resolver = module.get<PoolRecordEntriesResolver>(PoolRecordEntriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
