import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreatePoolInput } from './create-pool.input';

@InputType()
export class UpdatePoolInput extends PartialType(CreatePoolInput) {
  @Field(() => ID)
  id: number;
}
