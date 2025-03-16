import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { Pool } from "src/pools";



@ArgsType()
@InputType("FindAllPoolRecordsInput")
export class FindAllPoolRecordsInput {
    @Field({ nullable: true })
    recordDate?: Date;

    @Field({ nullable: true })
    pool?: Pool;
}