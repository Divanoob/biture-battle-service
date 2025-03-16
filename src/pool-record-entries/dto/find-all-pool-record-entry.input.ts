import { ArgsType, Field } from "@nestjs/graphql";
import { PoolRecord } from "src/pool-records";
import { User } from "src/users";


@ArgsType()
export class FindAllPoolRecordEntriesInput {
    
    @Field({ nullable: true })
    id?: number;

    @Field(() => User, { nullable: true })
    user?: User;

    @Field(() => PoolRecord, { nullable: true })
    record?: PoolRecord;
}