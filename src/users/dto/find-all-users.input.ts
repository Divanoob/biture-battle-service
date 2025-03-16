import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class FindAllUsersInput {
  @Field(() => ID, { description: 'Drink ID', nullable: true })
  id?: number;

  @Field({ description: 'User Name', nullable: true })
  name?: string;

  @Field({ description: 'Date', nullable: true })
  email?: string;
}
