import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/persistence/users.repository';
import { DrinksMapper } from './drinks.mapper';
import { CreateDrinkInput } from './dto/create-drink.input';
import { UpdateDrinkInput } from './dto/update-drink.input';
import { Drink } from './entities/drink.entity';
import { DrinkEntity } from './entities/drink.entity.typeorm';
import { DrinksRepository } from './persistence/drinks.repository';

@Injectable()
export class DrinksService {

  private readonly mapper: DrinksMapper;

  constructor(
    @InjectRepository(DrinkEntity) private readonly repository: DrinksRepository,
    @Inject() private readonly userRepository: UsersRepository,
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

  async findAll(): Promise<Drink[]> {
    const drinks = await this.repository.find();
    return this.mapper.entitiesToDomains(drinks);
  }

  async findOne(id: number): Promise<Drink> {
    const entity = await this.repository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException();
    }
    return this.mapper.entityToDomain(entity);
  }

  async update(id: number, updateDrinkInput: UpdateDrinkInput): Promise<boolean> {
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
    return (!!deleteResult.affected && deleteResult.affected > 0);
  }
}
