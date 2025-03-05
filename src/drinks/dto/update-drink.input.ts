import { CreateDrinkInput } from './create-drink.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDrinkInput extends PartialType(CreateDrinkInput) {
  @Field(() => Int)
  id: number;
}
