import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService, GetByIdDto } from 'src/core';
import { DrinkEntity } from 'src/drinks';
import { DrinksRepository } from 'src/drinks/persistence/drinks.repository';
import { PoolRecordsService } from 'src/pool-records';
import { PoolsService } from 'src/pools';
import { UsersService } from 'src/users';
import { CreatePoolRecordEntryInput } from './dto';
import { GetPoolRecordEntriesInput } from './dto/get-pool-record.entry.input';
import { UpdatePoolRecordEntryInput } from './dto/update-pool-record-entry.input';
import { PoolRecordEntry, PoolRecordEntryEntity } from './entities';
import { PoolRecordEntriesRepository } from './persistence/pool-record-entries.repository';
import { PoolRecordEntriesMapper } from './pool-record-entries.mapper';


@Injectable()
export class PoolRecordEntriesService extends CRUDService<
  PoolRecordEntry,
  PoolRecordEntryEntity,
  CreatePoolRecordEntryInput,
  UpdatePoolRecordEntryInput,
  GetPoolRecordEntriesInput,
  GetByIdDto,
  PoolRecordEntriesRepository
> {
  
  constructor(
    @InjectRepository(PoolRecordEntryEntity)
    repository: PoolRecordEntriesRepository,
    @Inject()
    private readonly drinksRepository: DrinksRepository,
    @Inject()
    private readonly recordService: PoolRecordsService,
    @Inject()
    private readonly poolService: PoolsService,
    @Inject()
    private readonly userService: UsersService
  ) {
    super ({
      domain: PoolRecordEntry,
      repository,
      mapper: PoolRecordEntriesMapper
    })
  }

  async checkRelationsBeforeQuery(dto: CreatePoolRecordEntryInput | UpdatePoolRecordEntryInput): Promise<boolean> {
    if (dto.record) {
      await this.recordService.findOne(dto.record, {});
    }
    if (dto.pool) {
      await this.poolService.findOne(dto.pool, {});
    }
    if (dto.user) {
      await this.userService.findOne(dto.user, {});
    }
    return true;
  }
  
  async create({ record, pool, user }: CreatePoolRecordEntryInput): Promise<PoolRecordEntryEntity> {
    // retrieve user drinks registered in the pool
    const drinks: DrinkEntity[] = await this.drinksRepository
      .createQueryBuilder()
      .select('alcoholQuantity')
      .from(DrinkEntity, 'drinks')
      .where('drinks.user = :user', { user: user.id })
      .innerJoin('drinks.pools', 'pool', 'pool.id = :pool', { pool: pool.id })
      .getMany();
    // sum stats
    const alcoholQuantity = drinks.reduce((acc, drink) => acc + drink.alcoholQuantity, 0);
    // calculate user alcohol level
    const alcoholLevel = 0; //TODO : calculate alcohol level
    return await this.repository.save({ record, user, alcoholLevel, alcoholQuantity });
  }
}
