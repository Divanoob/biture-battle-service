import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";

@InputType()
@ArgsType()
export class GetByIdDto {
    @Field(() => ID, { description: 'ID' })
    id: number;
}