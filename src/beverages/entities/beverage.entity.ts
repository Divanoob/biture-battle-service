import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Beverage {
  @Field(() => ID, { description: 'Beverage ID' })
  id: number;

  @Field({ description: 'Beverage Name' })
  name: number;

  @Field(() => Float, { description: 'Alcohol Concentration' })
  alcoholConcentration: number;
}
