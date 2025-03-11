import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordInput {
  @Field(() => ID)
  id: number;

  @Field(() => String, { description: 'Non Encrypted Password' })
  password: string;
}
