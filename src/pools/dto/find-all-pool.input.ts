import { ArgsType } from "@nestjs/graphql";
import { User } from "src/users";



@ArgsType()
export class FindAllPoolInput { //TODO : Add Fields Decorators
    id?: number;
    name?: string;
    users?: User[];
    creationDate?: Date;
    isOpen?: boolean;
}