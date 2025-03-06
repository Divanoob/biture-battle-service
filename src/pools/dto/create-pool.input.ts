import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePoolInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
