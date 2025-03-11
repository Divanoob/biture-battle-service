import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBeverageInput {

  @Field({ description: 'Beverage Name' })
  name: string;

  @Field(() => Float, { description: 'Alcohol Concentration' })
  alcoholConcentration: number;
}
