import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService, GetByIdDto } from 'src/core';
import { PoolRecordEntriesService, PoolRecordEntryEntity } from 'src/pool-record-entries';
import { PoolsRepository } from 'src/pools/persistence/pools.repository';
import { FindAllPoolRecordsInput, GeneratePoolRecordInput } from './dto';
import { PoolRecord, PoolRecordEntity } from './entities';
import { PoolRecordsRepository } from './persistence/pool-records.repository';
import { PoolRecordsMapper } from './pool-records.mapper';

@Injectable()
export class PoolRecordsService extends CRUDService<
  PoolRecord,
  PoolRecordEntity,
  PoolRecord,
  PoolRecord,
  FindAllPoolRecordsInput,
  GetByIdDto,
  PoolRecordsRepository
> {
  async checkRelationsBeforeQuery(): Promise<boolean> {
    return true;
  }

  constructor(
    @InjectRepository(PoolRecordEntity) repository: PoolRecordsRepository,
    @Inject() private readonly poolRepository: PoolsRepository,
    @Inject(forwardRef(() => PoolRecordEntriesService)) private readonly poolRecordEntriesService: PoolRecordEntriesService
  ) {
    super({ domain: PoolRecord, mapper: PoolRecordsMapper, repository});
  }

  async generatePoolRecords(generateDto: GeneratePoolRecordInput): Promise<PoolRecord> {
    const pool = await this.poolRepository.findOne({ where: { id: generateDto.poolId }, relations: { users: true } });
    if (!pool?.users) {
      throw new BadRequestException('This pool doesn\'t exist.');
    }
    const poolRecord = await this.repository.save({ recordDate: new Date(), pool });
    //generate entries
    const recordEntries: PoolRecordEntryEntity[] = [];
    for (const user of pool.users) {
      recordEntries.push(await this.poolRecordEntriesService.create({ user, record: poolRecord, pool}));
    }
    return poolRecord;
  }

}
