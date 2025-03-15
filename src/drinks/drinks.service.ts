import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MappedRelations } from 'src/core/RelationMapper';
import { UserEntity } from 'src/users/entities/user.typeorm.entity';
import { UsersRepository } from 'src/users/persistence/users.repository';
import { DrinksMapper } from './drinks.mapper';
import { CreateDrinkInput } from './dto/create-drink.input';
import { GetDrinksInput } from './dto/get-drinks.input';
import { UpdateDrinkInput } from './dto/update-drink.input';
import { Drink } from './entities/drink.graphql.entity';
import { DrinkEntity } from './entities/drink.typeorm.entity';
import { DrinksRepository } from './persistence/drinks.repository';

@Injectable()
export class DrinksService {
  private readonly mapper: DrinksMapper;

  constructor(
    @InjectRepository(DrinkEntity)
    private readonly repository: DrinksRepository,
    @InjectRepository(UserEntity)
    private readonly userRepository: UsersRepository,
  ) {
    this.mapper = new DrinksMapper();
  }

  async create(createDrinkInput: CreateDrinkInput): Promise<Drink> {
    const entity = this.repository.create(createDrinkInput);
    //Expands
    const user = await this.userRepository.findOneBy({
      id: createDrinkInput.userId,
    });
    if (user === null) {
      throw new BadRequestException("Specified user doesn't exist.");
    }
    entity.user = user;
    //Do the Insert
    const newEntity = await this.repository.save(entity);
    return this.mapper.entityToDomain(newEntity);
  }

  async findAll(
    drinkDto: GetDrinksInput,
    relations: MappedRelations<DrinkEntity>,
  ): Promise<Drink[]> {
    const drinks = await this.repository.find({
      relations,
      where: {
        ...drinkDto,
        user: { id: drinkDto.userId },
      },
    });
    return this.mapper.entitiesToDomains(drinks);
  }

  async findOne(
    id: number,
    relations: MappedRelations<DrinkEntity>,
  ): Promise<Drink> {
    const entity = await this.repository.findOne({
      where: { id },
      relations,
    });
    if (entity === null) {
      throw new NotFoundException();
    }
    return this.mapper.entityToDomain(entity);
  }

  async update(
    id: number,
    updateDrinkInput: UpdateDrinkInput,
  ): Promise<boolean> {
    //Retrieve current entitty
    const entity = await this.repository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException();
    }
    //Expands
    const user = await this.userRepository.findOneBy({
      id: updateDrinkInput.userId,
    });
    if (user === null) {
      throw new BadRequestException("Specified user doesn't exist.");
    }
    entity.user = user;
    //Do the update
    await this.repository.save(entity);
    return true;
  }

  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.repository.delete({ id });
    return !!deleteResult.affected && deleteResult.affected > 0;
  }
}
