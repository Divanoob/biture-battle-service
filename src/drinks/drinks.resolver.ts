import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DrinksService } from './drinks.service';
import { CreateDrinkInput } from './dto/create-drink.input';
import { UpdateDrinkInput } from './dto/update-drink.input';
import { Drink } from './entities/drink.entity';

@Resolver(() => Drink)
export class DrinksResolver {
  constructor(private readonly drinksService: DrinksService) {}

  @Mutation(() => Drink)
  async createDrink(@Args('createDrinkInput') createDrinkInput: CreateDrinkInput) {
    return await this.drinksService.create(createDrinkInput);
  }

  @Query(() => [Drink], { name: 'drinks' })
  async findAll() {
    return await this.drinksService.findAll();
  }

  @Query(() => Drink, { name: 'drink' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.drinksService.findOne(id);
  }

  @Mutation(() => Boolean)
  async updateDrink(@Args('updateDrinkInput') updateDrinkInput: UpdateDrinkInput) {
    return await this.drinksService.update(updateDrinkInput.id, updateDrinkInput);
  }

  @Mutation(() => Boolean)
  async removeDrink(@Args('id', { type: () => Int }) id: number) {
    return await this.drinksService.remove(id);
  }
}
