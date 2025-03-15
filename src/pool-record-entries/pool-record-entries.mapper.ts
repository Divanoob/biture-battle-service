import { BaseMapper } from "src/core/BaseMapper";
import { PoolRecord } from "src/pool-records/entities/pool-record.graphql.entity";
import { PoolRecordsMapper } from "src/pool-records/pool-records.mapper";
import { User } from "src/users/entities/user.graphql.entity";
import { UsersMapper } from "src/users/users.mapper";
import { DeepPartial } from "typeorm";
import { PoolRecordEntry } from "./entities/pool-record-entry.graphql.entity";
import { PoolRecordEntryEntity } from "./entities/pool-record-entry.typeorm.entity";


export class PoolRecordEntriesMapper extends BaseMapper<PoolRecordEntry, PoolRecordEntryEntity> {
    async entityToDomain(entity: PoolRecordEntryEntity): Promise<PoolRecordEntry> {
        let user: User | undefined = undefined;
        if (entity.user) {
            const usersMapper = new UsersMapper();
            user = await usersMapper.entityToDomain(entity.user);
        }
        let record: PoolRecord | undefined = undefined;
        if (entity.record) {
            const poolRecordsMapper = new PoolRecordsMapper();
            record = await poolRecordsMapper.entityToDomain(entity.record);
        }
        return {
            id: entity.id,
            user,
            alcoholLevel: entity.alcoholLevel,
            alcoholQuantity: entity.alcoholQuantity,
            record
        }
    }

    async domainToEntity(domain: PoolRecordEntry): Promise<DeepPartial<PoolRecordEntryEntity>> {
        return {
            id: domain.id,
            alcoholLevel: domain.alcoholLevel,
            alcoholQuantity: domain.alcoholQuantity
        }
    }

}