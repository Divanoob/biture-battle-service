import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateUserNameInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'User Name' })
  name: string;
}
