import { Inject } from '@nestjs/common';
import { Args, ID, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { RelationMapper } from 'src/core';
import { CreatePoolInput, FindAllPoolInput, UpdatePoolInput } from './dto';
import { PoolEntity } from './entities';
import { Pool } from './entities/pool.graphql.entity';
import { PoolsService } from './pools.service';

@Resolver(() => Pool)
export class PoolsResolver {
  constructor(
    @Inject() private readonly service: PoolsService,
    @Inject() private readonly relationMapper: RelationMapper<PoolEntity>
  ) { }

  @Mutation(() => Pool)
  createPool(@Args('createPoolInput') createPoolInput: CreatePoolInput) {
    return this.service.create(createPoolInput);
  }

  @Query(() => [Pool], { name: 'pools' })
  findAll(
    @Args() dto: FindAllPoolInput,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.service.findAll(dto, this.relationMapper.map(PoolEntity, info));
  }

  @Query(() => Pool, { name: 'pool' })
  async findOne(
    @Args('id', { type: () => ID }) id: number,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.service.findOne({ id }, this.relationMapper.map(PoolEntity, info));
  }

  @Mutation(() => Pool)
  updatePool(@Args('updatePoolInput') updatePoolInput: UpdatePoolInput) {
    return this.service.update({ id: updatePoolInput.id }, updatePoolInput);
  }

  @Mutation(() => Pool)
  removePool(@Args('id', { type: () => ID }) id: number) {
    return this.service.remove({ id });
  }
}
