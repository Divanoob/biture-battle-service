import { ArgsType, Field, Float, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class GetUsersInput {
  @Field(() => ID, { description: 'Drink ID', nullable: true })
  id?: number;

  @Field({ description: 'User Name', nullable: true })
  name?: string;

  @Field({ description: 'Date', nullable: true })
  email?: string;
}
