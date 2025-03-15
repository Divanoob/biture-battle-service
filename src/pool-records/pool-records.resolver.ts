import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GeneratePoolRecordInput } from './dto/generate-pool-record.input';
import { PoolRecord } from './entities/pool-record.graphql.entity';
import { PoolRecordsService } from './pool-records.service';

@Resolver(() => PoolRecord)
export class PoolRecordsResolver {
  constructor(private readonly service: PoolRecordsService) {}

  @Mutation(() => PoolRecord)
  generatePoolRecord(@Args('generatePoolRecordInput') generatePoolRecordInput: GeneratePoolRecordInput) {
    return this.service.generatePoolRecords(generatePoolRecordInput);
  }

  @Query(() => [PoolRecord], { name: 'poolRecords' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => PoolRecord, { name: 'poolRecord' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }
}
