import { Inject } from '@nestjs/common';
import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { RelationMapper } from 'src/core/RelationMapper';
import { BeveragesService } from './beverages.service';
import { CreateBeverageInput } from './dto/create-beverage.input';
import { FindAllBeveragesInput } from './dto/find-all-beverages.input';
import { Beverage } from './entities/beverage.entity';
import { BeverageEntity } from './entities/beverage.entity.typeorm';

@Resolver(() => Beverage)
export class BeveragesResolver {
  constructor(
    @Inject() private readonly beveragesService: BeveragesService,
    @Inject()
    private readonly relationMapper: RelationMapper<BeverageEntity>,
  ) { }

  @Mutation(() => Beverage)
  createBeverage(@Args('createBeverageInput') createBeverageInput: CreateBeverageInput) {
    return this.beveragesService.create(createBeverageInput);
  }

  @Query(() => [Beverage], { name: 'beverages' })
  findAll(
    @Args() findBeveragesDto: FindAllBeveragesInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.beveragesService.findAll(findBeveragesDto, this.relationMapper.map(BeverageEntity, info));
  }

  @Query(() => Beverage, { name: 'beverage' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.beveragesService.findOne({ id }, this.relationMapper.map(BeverageEntity, info));
  }

  @Mutation(() => Beverage)
  removeBeverage(@Args('id', { type: () => Int }) id: number) {
    return this.beveragesService.remove({ id });
  }
}
