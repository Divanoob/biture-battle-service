import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { PoolRecord } from 'src/pool-records/entities/pool-record.graphql.entity';
import { User } from 'src/users/entities/user.graphql.entity';

@ObjectType()
export class PoolRecordEntry {
  @Field(() => ID, { description: 'Pool Record Entry ID' })
  id: number;

  @Field(() => User, { description: 'User', nullable: true })
  user?: User;

  @Field(() => Float, { description: 'User Alcohol Level in g/L' })
  alcoholLevel: number;
  
  @Field(() => Float, { description: 'User Total Quantity of Alcohol in his body' })
  alcoholQuantity: number;
  
  @Field(() => PoolRecord, { description: 'Record', nullable: true })
  record?: PoolRecord;
}
