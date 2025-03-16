import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/core/CRUDService';
import { GetByIdDto } from 'src/core/dto/get-by-id.dto';
import { UsersService } from 'src/users';
import { DrinksMapper } from './drinks.mapper';
import { CreateDrinkInput } from './dto/create-drink.input';
import { GetDrinksInput } from './dto/get-drinks.input';
import { UpdateDrinkInput } from './dto/update-drink.input';
import { Drink } from './entities/drink.graphql.entity';
import { DrinkEntity } from './entities/drink.typeorm.entity';
import { DrinksRepository } from './persistence/drinks.repository';

@Injectable()
export class DrinksService extends CRUDService<
  Drink,
  DrinkEntity,
  CreateDrinkInput,
  UpdateDrinkInput,
  GetDrinksInput,
  GetByIdDto,
  DrinksRepository
  > {

  constructor(
    @InjectRepository(DrinkEntity)
    repository: DrinksRepository,
    @Inject()
    private readonly userService: UsersService
  ) {
    super({
      domain: Drink,
      repository: repository,
      mapper: DrinksMapper
    });
  }
  
  async checkRelationsBeforeQuery(dto: CreateDrinkInput | UpdateDrinkInput): Promise<boolean> {
    if (dto.userId) {
      await this.userService.findOne({ id: dto.userId }, {});
    }
    return true;
  }
}
