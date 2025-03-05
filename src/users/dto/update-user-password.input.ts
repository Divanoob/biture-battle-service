import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'Non Encrypted Password' })
  password: string;
}
