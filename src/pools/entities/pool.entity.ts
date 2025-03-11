import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Drink } from 'src/drinks/entities/drink.entity';
import { PoolRecord } from 'src/pool-records/entities/pool-record.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
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
