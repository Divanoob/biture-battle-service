import { BaseMapper } from "src/core/BaseMapper";
import { User } from "src/users/entities/user.entity";
import { UserEntity } from "src/users/entities/user.entity.typeorm";
import { UsersMapper } from "src/users/users.mapper";
import { DeepPartial } from "typeorm";
import { Drink } from "./entities/drink.entity";
import { DrinkEntity } from "./entities/drink.entity.typeorm";

export class DrinksMapper extends BaseMapper<Drink, DrinkEntity> {
    
    async entityToDomain(entity: DrinkEntity): Promise<Drink> {
        let user: User | undefined = undefined;
        if (entity.user) {
            const usersMapper = new UsersMapper();
            user = await usersMapper.entityToDomain(entity.user);
        }
        return {
            id: entity.id,
            user,
            date: entity.date,
            alcoholQuantity: entity.alcoholQuantity
        }
    }

    async domainToEntity(domain: Drink): Promise<DeepPartial<DrinkEntity>> {
        let user: DeepPartial<UserEntity> | undefined = undefined;
        if (domain.user) {
            const usersMapper = new UsersMapper();
            user = await usersMapper.domainToEntity(domain.user);
        }
        return {
            id: domain.id,
            user,
        }
    }
    
}