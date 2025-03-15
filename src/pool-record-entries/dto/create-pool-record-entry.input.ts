import { Field, InputType } from '@nestjs/graphql';
import { PoolRecord } from 'src/pool-records/entities/pool-record.graphql.entity';
import { Pool } from 'src/pools';
import { User } from 'src/users/entities/user.graphql.entity';

@InputType()
export class CreatePoolRecordEntryInput {
  @Field(() => User, { description: 'User', nullable: true })
  user: User;
  
  @Field(() => PoolRecord, { description: 'Record', nullable: true })
  record: PoolRecord;
  
  @Field(() => Pool, { description: 'Pool', nullable: true })
  pool: Pool;
}
