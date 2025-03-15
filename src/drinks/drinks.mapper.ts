import { CRUDMapper } from "src/core/CRUDMapper";
import { GetByIdDto } from "src/core/dto/get-by-id.dto";
import { Pool } from "src/pools/entities/pool.graphql.entity";
import { PoolsMapper } from "src/pools/pools.mapper";
import { User } from "src/users/entities/user.graphql.entity";
import { UserEntity } from "src/users/entities/user.typeorm.entity";
import { UsersMapper } from "src/users/users.mapper";
import { DeepPartial } from "typeorm";
import { CreateDrinkInput } from "./dto/create-drink.input";
import { GetDrinksInput } from "./dto/get-drinks.input";
import { UpdateDrinkInput } from "./dto/update-drink.input";
import { Drink } from "./entities/drink.graphql.entity";
import { DrinkEntity } from "./entities/drink.typeorm.entity";

export class DrinksMapper extends CRUDMapper<
    Drink,
    DrinkEntity,
    CreateDrinkInput,
    UpdateDrinkInput,
    GetDrinksInput,
    GetByIdDto
> {
    async entityToDomain(entity: DrinkEntity): Promise<Drink> {
        let user: User | undefined = undefined;
        if (entity.user) {
            const usersMapper = new UsersMapper();
            user = await usersMapper.entityToDomain(entity.user);
        }
        let pools: Pool[] | undefined = undefined;
        if (entity.pools) {
            const poolsMapper = new PoolsMapper();
            pools = await poolsMapper.entitiesToDomains(entity.pools);
        }
        return {
            id: entity.id,
            user,
            date: entity.date,
            alcoholQuantity: entity.alcoholQuantity,
            quantity: entity.quantity,
            alcoholConcentration: entity.alcoholConcentration,
            pools
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