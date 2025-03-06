import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PoolRecordEntryEntity } from 'src/pool-record-entries/entities/pool-record-entry.entity.typeorm';

@ObjectType()
export class PoolRecord {
  @Field(() => ID, { description: 'Pool Record ID' })
  id: number;

  @Field({ description: 'Record Date' })
  recordDate: Date;

  @Field({ description: 'Pool Record Entries' })
  entries: PoolRecordEntryEntity[];
}
