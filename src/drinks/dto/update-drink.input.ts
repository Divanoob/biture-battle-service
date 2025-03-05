import { CreateDrinkInput } from './create-drink.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateDrinkInput extends PartialType(CreateDrinkInput) {
  @Field(() => ID)
  id: number;
}
