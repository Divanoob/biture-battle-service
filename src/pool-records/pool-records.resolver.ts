import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePoolRecordInput } from './dto/create-pool-record.input';
import { UpdatePoolRecordInput } from './dto/update-pool-record.input';
import { PoolRecord } from './entities/pool-record.graphql.entity';
import { PoolRecordsService } from './pool-records.service';

@Resolver(() => PoolRecord)
export class PoolRecordsResolver {
  constructor(private readonly poolRecordsService: PoolRecordsService) {}

  @Mutation(() => PoolRecord)
  createPoolRecord(@Args('createPoolRecordInput') createPoolRecordInput: CreatePoolRecordInput) {
    return this.poolRecordsService.create(createPoolRecordInput);
  }

  @Query(() => [PoolRecord], { name: 'poolRecords' })
  findAll() {
    return this.poolRecordsService.findAll();
  }

  @Query(() => PoolRecord, { name: 'poolRecord' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.poolRecordsService.findOne(id);
  }

  @Mutation(() => PoolRecord)
  updatePoolRecord(@Args('updatePoolRecordInput') updatePoolRecordInput: UpdatePoolRecordInput) {
    return this.poolRecordsService.update(updatePoolRecordInput.id, updatePoolRecordInput);
  }

  @Mutation(() => PoolRecord)
  removePoolRecord(@Args('id', { type: () => Int }) id: number) {
    return this.poolRecordsService.remove(id);
  }
}
