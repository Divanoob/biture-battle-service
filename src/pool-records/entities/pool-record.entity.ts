import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PoolRecordEntry } from 'src/pool-record-entries/entities/pool-record-entry.entity';

@ObjectType()
export class PoolRecord {
  @Field(() => ID, { description: 'Pool Record ID' })
  id: number;

  @Field({ description: 'Record Date' })
  recordDate: Date;

  @Field(() => [PoolRecordEntry], { description: 'Pool Record Entries' })
  entries: PoolRecordEntry[];
}
