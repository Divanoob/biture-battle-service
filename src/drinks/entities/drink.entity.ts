import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Pool } from 'src/pools/entities/pool.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Drink {
  @Field(() => Int, { description: 'Drink ID' })
  id: number;

  @Field(() => User, { description: 'User', nullable: true })
  user?: User;

  @Field({ description: 'Date' })
  date: Date;

  @Field({ nullable: true })
  drinkName?: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  alcoholConcentration: number;

  @Field(() => Float, { description: 'Alcohol Quantity' })
  alcoholQuantity: number;

  @Field(() => [Pool], { description: 'Pools', nullable: true })
  pools?: Pool[];
}
