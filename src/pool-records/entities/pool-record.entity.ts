import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PoolRecordEntry } from 'src/pool-record-entries/entities/pool-record-entry.entity';
import { Pool } from 'src/pools/entities/pool.entity';

@ObjectType()
export class PoolRecord {
  @Field(() => ID, { description: 'Pool Record ID' })
  id: number;

  @Field({ description: 'Record Date' })
  recordDate: Date;

  @Field(() => [PoolRecordEntry], { description: 'Pool Record Entries', nullable: true })
  entries?: PoolRecordEntry[];
  
  @Field(() => [Pool], { description: 'Pool', nullable: true })
  pool?: Pool;
}
