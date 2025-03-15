import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrinkEntity } from 'src/drinks';
import { DrinksRepository } from 'src/drinks/persistence/drinks.repository';
import { CreatePoolRecordEntryInput } from './dto';
import { PoolRecordEntryEntity } from './entities';
import { PoolRecordEntriesRepository } from './persistence/pool-record-entries.repository';


@Injectable()
export class PoolRecordEntriesService {
  
  constructor(
    @InjectRepository(PoolRecordEntryEntity)
    private readonly repository: PoolRecordEntriesRepository,
    @Inject()
    private readonly drinksRepository: DrinksRepository
  ) {}
  
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
