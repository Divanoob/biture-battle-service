import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePoolInput {
  @Field({ description: 'Pool Name' })
  name: string;
}
