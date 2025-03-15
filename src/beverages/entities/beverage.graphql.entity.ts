import { Field, Float, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType("BeverageInput")
export class Beverage {
  @Field(() => ID, { description: 'Beverage ID' })
  id: number;

  @Field({ description: 'Beverage Name' })
  name: string;

  @Field(() => Float, { description: 'Alcohol Concentration' })
  alcoholConcentration: number;
}
