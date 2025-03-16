import { CRUDMapper, GetByIdDto } from "src/core";
import { DeepPartial } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";
import { FindAllUsersInput } from "./dto/find-all-users.input";
import { User } from "./entities/user.graphql.entity";
import { UserEntity } from "./entities/user.typeorm.entity";

export class UsersMapper extends CRUDMapper<
    User,
    UserEntity,
    CreateUserInput,
    User,
    FindAllUsersInput,
    GetByIdDto
    > {
    
    constructor() {
        super({ domain: User });
    }

    async entityToDomain(entity: UserEntity): Promise<User> {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email
        }
    }

    async domainToEntity(domain: User): Promise<DeepPartial<UserEntity>> {
        return {
            id: domain.id,
            name: domain.name,
            email: domain.email,
        }
    }
}