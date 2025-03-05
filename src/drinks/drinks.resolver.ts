import {
  Args,
  Info,
  Int,
  Mutation,
  Parent,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { DrinksService } from './drinks.service';
import { CreateDrinkInput } from './dto/create-drink.input';
import { UpdateDrinkInput } from './dto/update-drink.input';
import { Drink } from './entities/drink.entity';
import { GraphQLResolveInfo } from 'graphql';
import { GraphRelationBuilder } from 'typeorm-relations-graphql';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DrinkEntity } from './entities/drink.entity.typeorm';
import { GetDrinksInput } from './dto/get-drinks.input';
import { RelationMapper } from 'src/core/RelationMapper';
import { Inject } from '@nestjs/common';

@Resolver(() => Drink)
export class DrinksResolver {
  constructor(
    @Inject() private readonly drinksService: DrinksService,
    @Inject()
    private readonly relationMapper: RelationMapper<DrinkEntity>,
  ) {}

  @Mutation(() => Drink)
  async createDrink(
    @Args('createDrinkInput') createDrinkInput: CreateDrinkInput,
  ) {
    return await this.drinksService.create(createDrinkInput);
  }

  @Query(() => [Drink], { name: 'drinks' })
  async drinks(
    @Args() drinkDto: GetDrinksInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return await this.drinksService.findAll(
      drinkDto,
      this.relationMapper.map(DrinkEntity, info),
    );
  }

  @Query(() => Drink, { name: 'drink' })
  async drink(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    return await this.drinksService.findOne(
      id,
      this.relationMapper.map(DrinkEntity, info),
    );
  }

  @Mutation(() => Boolean)
  async updateDrink(
    @Args('updateDrinkInput') updateDrinkInput: UpdateDrinkInput,
  ) {
    return await this.drinksService.update(
      updateDrinkInput.id,
      updateDrinkInput,
    );
  }

  @Mutation(() => Boolean)
  async removeDrink(@Args('id', { type: () => Int }) id: number) {
    return await this.drinksService.remove(id);
  }
}
