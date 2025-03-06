import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePoolRecordInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
