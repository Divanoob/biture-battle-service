import { ArgsType, Field, Float, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class GetDrinksInput {
  @Field(() => ID, { description: 'Drink ID', nullable: true })
  id?: number;

  @Field(() => Int, { description: 'User ID', nullable: true })
  userId?: number;

  @Field(() => Float, { description: 'Alcohol Quantity', nullable: true })
  alcoholQuantity?: number;

  @Field({ description: 'Date', nullable: true })
  date?: Date;
}
