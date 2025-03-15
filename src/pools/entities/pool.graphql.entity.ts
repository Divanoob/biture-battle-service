import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Drink } from 'src/drinks/entities/drink.graphql.entity';
import { PoolRecord } from 'src/pool-records/entities/pool-record.graphql.entity';
import { User } from 'src/users/entities/user.graphql.entity';

@ObjectType()
@InputType("PoolInput")
export class Pool {
  @Field(() => ID, { description: 'Pool ID' })
  id: number;
  
  @Field(() => [User], { description: 'Users', nullable: true })
  users?: User[];
  
  @Field({ description: 'Creation Date' })
  creationDate: Date;
  
  @Field({ description: 'Is the Pool Open' })
  isOpen: boolean;
  
  @Field(() => [Drink], { description: 'Drinks', nullable: true })
  drinks?: Drink[];
  
  @Field(() => [PoolRecord], { description: 'Records', nullable: true })
  records?: PoolRecord[];
}
