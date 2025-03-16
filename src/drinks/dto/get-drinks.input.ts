import { ArgsType, Field, Float, ID } from '@nestjs/graphql';
import { User } from 'src/users';

@ArgsType()
export class GetDrinksInput {
  @Field(() => ID, { description: 'Drink ID', nullable: true })
  id?: number;

  @Field(() => User, { description: 'User', nullable: true })
  user?: User;

  @Field(() => Float, { description: 'Alcohol Quantity', nullable: true })
  alcoholQuantity?: number;

  @Field({ description: 'Date', nullable: true })
  date?: Date;
}
