import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserNameInput {
  @Field(() => ID)
  id: number;

  @Field(() => String, { description: 'User Name' })
  name: string;
}
