/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService, GetByIdDto } from 'src/core';
import { PoolsMapper } from '.';
import { CreatePoolInput, FindAllPoolInput, UpdatePoolInput } from './dto';
import { Pool, PoolEntity } from './entities';
import { PoolsRepository } from './persistence/pools.repository';

@Injectable()
export class PoolsService extends CRUDService<
  Pool,
  PoolEntity,
  CreatePoolInput,
  UpdatePoolInput,
  FindAllPoolInput,
  GetByIdDto,
  PoolsRepository
> {

  constructor(
    @InjectRepository(PoolEntity)
    repository: PoolsRepository
  ) {
    super({
      domain: Pool,
      repository,
      mapper: PoolsMapper
    });
  }
  
  async checkRelationsBeforeQuery(): Promise<boolean> {
    return true;
  }
  
}
