import { Test, TestingModule } from '@nestjs/testing';
import { PoolRecordsResolver } from '../pool-records.resolver';
import { PoolRecordsService } from '../pool-records.service';

describe('PoolRecordsResolver', () => {
  let resolver: PoolRecordsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoolRecordsResolver, PoolRecordsService],
    }).compile();

    resolver = module.get<PoolRecordsResolver>(PoolRecordsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
