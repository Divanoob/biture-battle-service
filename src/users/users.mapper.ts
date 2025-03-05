import { BaseMapper } from "src/core/BaseMapper";
import { DeepPartial } from "typeorm";
import { User } from "./entities/user.entity";
import { UserEntity } from "./entities/user.entity.typeorm";



export class UsersMapper extends BaseMapper<User, UserEntity> {

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