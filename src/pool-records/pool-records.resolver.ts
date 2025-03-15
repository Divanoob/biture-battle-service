import { Inject } from '@nestjs/common';
import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { RelationMapper } from 'src/core';
import { FindAllPoolRecordsInput, GeneratePoolRecordInput } from './dto';
import { PoolRecord, PoolRecordEntity } from './entities';
import { PoolRecordsService } from './pool-records.service';

@Resolver(() => PoolRecord)
export class PoolRecordsResolver {
  constructor(
    @Inject() private readonly service: PoolRecordsService, 
    @Inject() private readonly relationMapper: RelationMapper<PoolRecordEntity>
  ) { }

  @Mutation(() => PoolRecord)
  generatePoolRecord(
    @Args('generatePoolRecordInput') generatePoolRecordInput: GeneratePoolRecordInput
  ) {
    return this.service.generatePoolRecords(generatePoolRecordInput);
  }

  @Query(() => [PoolRecord], { name: 'poolRecords' })
  findAll(
    @Args('findAllPoolRecordsInput') findAllPoolRecordsInput: FindAllPoolRecordsInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.service.findAll(findAllPoolRecordsInput, this.relationMapper.map(PoolRecordEntity, info));
  }

  @Query(() => PoolRecord, { name: 'poolRecord' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.service.findOne({ id }, this.relationMapper.map(PoolRecordEntity, info));
  }
}
