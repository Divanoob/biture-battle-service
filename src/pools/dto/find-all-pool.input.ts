import { ArgsType, Field, ID } from "@nestjs/graphql";
import { User } from "src/users";

@ArgsType()
export class FindAllPoolInput {

    @Field(() => ID, { nullable: true })
    id?: number;

    @Field({ nullable: true })
    name?: string;

    @Field(() => [User], { nullable: true })
    users?: User[];

    @Field({ nullable: true })
    creationDate?: Date;

    @Field({ nullable: true })
    isOpen?: boolean;
}