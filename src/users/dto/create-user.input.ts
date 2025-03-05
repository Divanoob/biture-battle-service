import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'User Name' })
  name: string;

  @Field(() => String, { description: 'E-Mail' })
  email: string;

  @Field(() => String, { description: 'Non Encrypted Password' })
  password: string;
}
