import { CreatePoolRecordEntryInput } from './create-pool-record-entry.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePoolRecordEntryInput extends PartialType(CreatePoolRecordEntryInput) {
  @Field(() => Int)
  id: number;
}
