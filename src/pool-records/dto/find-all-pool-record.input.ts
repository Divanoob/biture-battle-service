import { ArgsType, Field, InputType } from "@nestjs/graphql";



@ArgsType()
@InputType("FindAllPoolRecordsInput")
export class FindAllPoolRecordsInput {
    @Field({ nullable: true })
    recordDate?: Date;
}