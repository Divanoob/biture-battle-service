import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Beverage {
  @Field(() => ID, { description: 'Beverage ID' })
  id: number;

  @Field({ description: 'Beverage Name' })
  name: string;

  @Field(() => Float, { description: 'Alcohol Concentration' })
  alcoholConcentration: number;
}
