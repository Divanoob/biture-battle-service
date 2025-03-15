import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePoolRecordEntryInput } from './dto/create-pool-record-entry.input';
import { UpdatePoolRecordEntryInput } from './dto/update-pool-record-entry.input';
import { PoolRecordEntry } from './entities/pool-record-entry.graphql.entity';
import { PoolRecordEntriesService } from './pool-record-entries.service';

@Resolver(() => PoolRecordEntry)
export class PoolRecordEntriesResolver {
  constructor(private readonly poolRecordEntriesService: PoolRecordEntriesService) {}

  @Mutation(() => PoolRecordEntry)
  createPoolRecordEntry(@Args('createPoolRecordEntryInput') createPoolRecordEntryInput: CreatePoolRecordEntryInput) {
    return this.poolRecordEntriesService.create(createPoolRecordEntryInput);
  }

  @Query(() => [PoolRecordEntry], { name: 'poolRecordEntries' })
  findAll() {
    return this.poolRecordEntriesService.findAll();
  }

  @Query(() => PoolRecordEntry, { name: 'poolRecordEntry' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.poolRecordEntriesService.findOne(id);
  }

  @Mutation(() => PoolRecordEntry)
  updatePoolRecordEntry(@Args('updatePoolRecordEntryInput') updatePoolRecordEntryInput: UpdatePoolRecordEntryInput) {
    return this.poolRecordEntriesService.update(updatePoolRecordEntryInput.id, updatePoolRecordEntryInput);
  }

  @Mutation(() => PoolRecordEntry)
  removePoolRecordEntry(@Args('id', { type: () => Int }) id: number) {
    return this.poolRecordEntriesService.remove(id);
  }
}
