import { CreatePoolInput } from './create-pool.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePoolInput extends PartialType(CreatePoolInput) {
  @Field(() => Int)
  id: number;
}
