import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService, GetByIdDto } from 'src/core';
import { BeverageMapper } from './beverage.mapper';
import { CreateBeverageInput, FindAllBeveragesInput, UpdateBeverageInput } from './dto';
import { Beverage, BeverageEntity } from './entities';
import { BeveragesRepository } from './persistence/beverages.repository';

@Injectable()
export class BeveragesService extends CRUDService<
  Beverage,
  BeverageEntity,
  CreateBeverageInput,
  UpdateBeverageInput,
  FindAllBeveragesInput,
  GetByIdDto,
  BeveragesRepository
> {
  
  async checkRelationsBeforeQuery(): Promise<boolean> {
    return true;
  }

  constructor(@InjectRepository(BeverageEntity) repository: BeveragesRepository) {
    super({
      domain: Beverage,
      repository: BeveragesRepository,
      mapper: BeverageMapper
    }, repository);
  }
}
