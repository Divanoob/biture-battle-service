import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BeveragesService } from './beverages.service';
import { CreateBeverageInput } from './dto/create-beverage.input';
import { Beverage } from './entities/beverage.entity';

@Resolver(() => Beverage)
export class BeveragesResolver {
  constructor(private readonly beveragesService: BeveragesService) {}

  @Mutation(() => Beverage)
  createBeverage(@Args('createBeverageInput') createBeverageInput: CreateBeverageInput) {
    return this.beveragesService.create(createBeverageInput);
  }

  @Query(() => [Beverage], { name: 'beverages' })
  findAll() {
    return this.beveragesService.findAll();
  }

  @Query(() => Beverage, { name: 'beverage' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.beveragesService.findOne(id);
  }

  @Mutation(() => Beverage)
  removeBeverage(@Args('id', { type: () => Int }) id: number) {
    return this.beveragesService.remove(id);
  }
}
