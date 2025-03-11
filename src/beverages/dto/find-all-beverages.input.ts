import { ArgsType, Field } from "@nestjs/graphql";


@ArgsType()
export class FindAllBeveragesInput {
  @Field({ description: 'Name', nullable: true })
  name?: string;
}