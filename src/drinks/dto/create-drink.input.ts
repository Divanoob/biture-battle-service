import { Field, Float, InputType } from '@nestjs/graphql';
import { User } from 'src/users';

@InputType()
export class CreateDrinkInput {
  @Field(() => User, { description: 'User' })
  user: User;

  @Field(() => Float, { description: 'Alcohol Quantity' })
  alcoholQuantity: number;

  @Field({ description: 'Date and Hour' })
  date: Date;
}
