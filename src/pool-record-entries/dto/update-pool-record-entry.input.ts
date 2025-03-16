import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreatePoolRecordEntryInput } from './create-pool-record-entry.input';

@InputType()
export class UpdatePoolRecordEntryInput extends PartialType(CreatePoolRecordEntryInput) {
  @Field(() => ID)
  id: number;
}
