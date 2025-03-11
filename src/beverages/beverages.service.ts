import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService, CRUDServiceOptions } from 'src/core/CRUDService';
import { BeverageMapper } from './beverage.mapper';
import { CreateBeverageInput } from './dto/create-beverage.input';
import { FindAllBeveragesInput } from './dto/find-all-beverages.input';
import { FindOneBeverageInput } from './dto/find-one-beverage.input';
import { UpdateBeverageInput } from './dto/update-beverage.input';
import { Beverage } from './entities/beverage.entity';
import { BeverageEntity } from './entities/beverage.typeorm.entity';
import { BeveragesRepository } from './persistence/beverages.repository';

const exportServiceOptions: CRUDServiceOptions<
  Beverage,
  BeverageEntity,
  CreateBeverageInput,
  UpdateBeverageInput,
  FindAllBeveragesInput,
  FindOneBeverageInput,
  BeveragesRepository
> = {
  domain: Beverage,
  entity: BeverageEntity,
  createDto: CreateBeverageInput,
  updateDto: UpdateBeverageInput,
  findAllDto: FindAllBeveragesInput,
  findOneDto: FindOneBeverageInput,
  repository: BeveragesRepository,
  mapper: BeverageMapper,
}

@Injectable()
export class BeveragesService extends CRUDService<
  Beverage,
  BeverageEntity,
  CreateBeverageInput,
  UpdateBeverageInput,
  FindAllBeveragesInput,
  FindOneBeverageInput,
  BeveragesRepository
> {
  
  async checkRelationsBeforeQuery(): Promise<boolean> {
    return true;
  }

  constructor(@InjectRepository(BeverageEntity) repository: BeveragesRepository) {
    super(exportServiceOptions, repository);
  }
}
