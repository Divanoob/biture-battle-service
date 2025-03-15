import { BaseMapper } from "src/core/BaseMapper";
import { DrinksMapper } from "src/drinks/drinks.mapper";
import { Drink } from "src/drinks/entities/drink.graphql.entity";
import { PoolRecord } from "src/pool-records/entities/pool-record.graphql.entity";
import { PoolRecordsMapper } from "src/pool-records/pool-records.mapper";
import { User } from "src/users/entities/user.graphql.entity";
import { UsersMapper } from "src/users/users.mapper";
import { Pool } from "./entities/pool.graphql.entity";
import { PoolEntity } from "./entities/pool.typeorm.entity";


export class PoolsMapper extends BaseMapper<Pool, PoolEntity> {
        
    async entityToDomain(entity: PoolEntity): Promise<Pool> {
        let users: User[] | undefined = undefined;
        if (entity.users) {
            const userMapper = new UsersMapper();
            users = await userMapper.entitiesToDomains(entity.users);
        }
        let drinks: Drink[] | undefined = undefined;
        if(entity.drinks) {
            const drinksMapper = new DrinksMapper();
            drinks = await drinksMapper.entitiesToDomains(entity.drinks);
        }
        let records: PoolRecord[] | undefined = undefined;
        if (entity.records) {
            const recordMapper = new PoolRecordsMapper();
            records = await recordMapper.entitiesToDomains(entity.records);
        }
        return {
            id: entity.id,
            creationDate: entity.creationDate,
            isOpen: entity.isOpen,
            users,
            drinks,
            records,
        }
    }

    async domainToEntity(domain: Pool): Promise<PoolEntity> {
        return {
            id: domain.id,
            creationDate: domain.creationDate,
            isOpen: domain.isOpen,
        }
    }
}