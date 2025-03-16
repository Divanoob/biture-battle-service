import { Inject } from '@nestjs/common';
import {
  Args,
  ID,
  Info,
  Mutation,
  Query,
  Resolver
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { RelationMapper } from 'src/core/RelationMapper';
import { DrinksService } from './drinks.service';
import { CreateDrinkInput } from './dto/create-drink.input';
import { GetDrinksInput } from './dto/get-drinks.input';
import { UpdateDrinkInput } from './dto/update-drink.input';
import { Drink } from './entities/drink.graphql.entity';
import { DrinkEntity } from './entities/drink.typeorm.entity';

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
    @Args('id', { type: () => ID }) id: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    return await this.drinksService.findOne(
      { id },
      this.relationMapper.map(DrinkEntity, info),
    );
  }

  @Mutation(() => Boolean)
  async updateDrink(
    @Args('updateDrinkInput') updateDrinkInput: UpdateDrinkInput,
  ) {
    return await this.drinksService.update(
      { id: updateDrinkInput.id },
      updateDrinkInput,
    );
  }

  @Mutation(() => Boolean)
  async removeDrink(@Args('id', { type: () => ID }) id: number) {
    return await this.drinksService.remove({ id });
  }
}
