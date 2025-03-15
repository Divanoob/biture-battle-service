import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService, CRUDServiceOptions } from 'src/core/CRUDService';
import { GetByIdDto } from 'src/core/dto/get-by-id.dto';
import { DrinksMapper } from './drinks.mapper';
import { CreateDrinkInput } from './dto/create-drink.input';
import { GetDrinksInput } from './dto/get-drinks.input';
import { UpdateDrinkInput } from './dto/update-drink.input';
import { Drink } from './entities/drink.graphql.entity';
import { DrinkEntity } from './entities/drink.typeorm.entity';
import { DrinksRepository } from './persistence/drinks.repository';

const drinkServiceOptions: CRUDServiceOptions<
  Drink,
  DrinkEntity,
  CreateDrinkInput,
  UpdateDrinkInput,
  GetDrinksInput,
  GetByIdDto,
  DrinksRepository
> = {
  domain: Drink,
  entity: DrinkEntity,
  createDto: CreateDrinkInput,
  updateDto: UpdateDrinkInput,
  findAllDto: GetDrinksInput,
  findOneDto: GetByIdDto,
  repository: DrinksRepository,
  mapper: DrinksMapper,
}

@Injectable()
export class DrinksService extends CRUDService<Drink, DrinkEntity, CreateDrinkInput, UpdateDrinkInput, GetDrinksInput, GetByIdDto, DrinksRepository> {
  async checkRelationsBeforeQuery(): Promise<boolean> {
    return true;
  }

  constructor(
    @InjectRepository(DrinkEntity)
    repository: DrinksRepository
  ) {
    super(drinkServiceOptions, repository);
  }
}
