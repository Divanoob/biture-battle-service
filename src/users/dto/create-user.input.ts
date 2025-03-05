import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'User Name' })
  name: string;

  @Field({ description: 'E-Mail' })
  email: string;

  @Field({ description: 'Non Encrypted Password' })
  password: string;
}
