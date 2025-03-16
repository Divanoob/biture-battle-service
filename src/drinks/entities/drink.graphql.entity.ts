import { Field, Float, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Pool } from 'src/pools/entities/pool.graphql.entity';
import { User } from 'src/users/entities/user.graphql.entity';

@ObjectType()
@InputType("DrinkInput")
export class Drink {
  @Field(() => ID, { description: 'Drink ID' })
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
