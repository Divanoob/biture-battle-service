import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateDrinkInput {
  @Field(() => Int, { description: 'User ID' })
  userId: number;
  @Field(() => Float, { description: 'Alcohol Quantity' })
  alcoholQuantity: number;
  @Field(() => Date, { description: 'Date and Hour' })
  date: Date;
}
