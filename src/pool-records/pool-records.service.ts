import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PoolRecordEntriesService, PoolRecordEntryEntity } from 'src/pool-record-entries';
import { PoolEntity } from 'src/pools';
import { PoolsRepository } from 'src/pools/persistence/pools.repository';
import { GeneratePoolRecordInput } from './dto';
import { PoolRecord, PoolRecordEntity } from './entities';
import { PoolRecordsRepository } from './persistence/pool-records.repository';

@Injectable()
export class PoolRecordsService {

  constructor(
    @InjectRepository(PoolRecordEntity)
    private readonly repository: PoolRecordsRepository,
    @InjectRepository(PoolEntity)
    private readonly poolRepository: PoolsRepository,
    @Inject()
    private readonly poolRecordEntriesService: PoolRecordEntriesService
  ) { }

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

  async findAll(): Promise<PoolRecord[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<PoolRecord> {
    const record = await this.repository.findOne({ where: { id } });
    if (!record) {
      throw new BadRequestException('This record doesn\'t exist.');
    }
    return record;
  }
}
