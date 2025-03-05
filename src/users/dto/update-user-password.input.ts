import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordInput {
  @Field(() => ID)
  id: number;

  @Field(() => String, { description: 'Non Encrypted Password' })
  password: string;
}
