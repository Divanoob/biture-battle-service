import { CreatePoolRecordInput } from './create-pool-record.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePoolRecordInput extends PartialType(CreatePoolRecordInput) {
  @Field(() => Int)
  id: number;
}
