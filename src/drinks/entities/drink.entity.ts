import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Drink {
  @Field(() => Int, { description: 'Drink ID' })
  id: number;

  @Field(() => User, { description: 'User', nullable: true })
  user?: User;

  @Field(() => Float, { description: 'Alcohol Quantity' })
  alcoholQuantity: number;

  @Field({ description: 'Date' })
  date: Date;
}
