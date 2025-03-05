import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserNameInput {
  @Field(() => ID)
  id: number;

  @Field(() => String, { description: 'User Name' })
  name: string;
}
