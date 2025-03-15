import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService, CRUDServiceOptions } from 'src/core/CRUDService';
import { GetByIdDto } from 'src/core/dto/get-by-id.dto';
import { CreatePoolRecordEntryInput } from './dto/create-pool-record-entry.input';
import { GetPoolRecordEntriesInput } from './dto/get-pool-record.entry.input';
import { UpdatePoolRecordEntryInput } from './dto/update-pool-record-entry.input';
import { PoolRecordEntry } from './entities/pool-record-entry.graphql.entity';
import { PoolRecordEntryEntity } from './entities/pool-record-entry.typeorm.entity';
import { PoolRecordEntriesRepository } from './persistence/pool-record-entries.repository';
import { PoolRecordEntriesMapper } from './pool-record-entries.mapper';

const poolRecordEntryServiceOptions: CRUDServiceOptions<
  PoolRecordEntry,
  PoolRecordEntryEntity,
  CreatePoolRecordEntryInput,
  UpdatePoolRecordEntryInput,
  GetPoolRecordEntriesInput,
  GetByIdDto,
  PoolRecordEntriesRepository
> = {
  domain: PoolRecordEntry,
  entity: PoolRecordEntryEntity,
  createDto: CreatePoolRecordEntryInput,
  updateDto: UpdatePoolRecordEntryInput,
  findAllDto: GetPoolRecordEntriesInput,
  findOneDto: GetByIdDto,
  repository: PoolRecordEntriesRepository,
  mapper: PoolRecordEntriesMapper,
}

@Injectable()
export class PoolRecordEntriesService extends CRUDService<
  PoolRecordEntry,
  PoolRecordEntryEntity,
  CreatePoolRecordEntryInput,
  UpdatePoolRecordEntryInput,
  GetPoolRecordEntriesInput,
  GetByIdDto,
  PoolRecordEntriesRepository>{
  
  constructor(
    @InjectRepository(PoolRecordEntryEntity)
    repository: PoolRecordEntriesRepository
  ) {
    super(poolRecordEntryServiceOptions, repository);
  }
  
  async checkRelationsBeforeQuery(): Promise<boolean> {
    return true;
  }
}
