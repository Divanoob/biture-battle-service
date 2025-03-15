import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType("UserInput")
export class User {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field(() => String, { description: 'Name' })
  name: string;

  @Field(() => String, { description: 'E-Mail Address' })
  email: string;
}
