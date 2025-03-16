import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType("UserInput")
export class User {
  @Field(() => ID, { description: 'ID' })
  id: number;

  @Field(() => String, { description: 'Name' })
  name: string;

  @Field(() => String, { description: 'E-Mail Address' })
  email: string;
}
