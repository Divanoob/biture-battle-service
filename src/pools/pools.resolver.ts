import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePoolInput } from './dto/create-pool.input';
import { UpdatePoolInput } from './dto/update-pool.input';
import { Pool } from './entities/pool.graphql.entity';
import { PoolsService } from './pools.service';

@Resolver(() => Pool)
export class PoolsResolver {
  constructor(private readonly poolsService: PoolsService) {}

  @Mutation(() => Pool)
  createPool(@Args('createPoolInput') createPoolInput: CreatePoolInput) {
    return this.poolsService.create(createPoolInput);
  }

  @Query(() => [Pool], { name: 'pools' })
  findAll() {
    return this.poolsService.findAll();
  }

  @Query(() => Pool, { name: 'pool' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.poolsService.findOne(id);
  }

  @Mutation(() => Pool)
  updatePool(@Args('updatePoolInput') updatePoolInput: UpdatePoolInput) {
    return this.poolsService.update(updatePoolInput.id, updatePoolInput);
  }

  @Mutation(() => Pool)
  removePool(@Args('id', { type: () => Int }) id: number) {
    return this.poolsService.remove(id);
  }
}
