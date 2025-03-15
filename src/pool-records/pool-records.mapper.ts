import { BaseMapper } from "src/core/BaseMapper";
import { PoolRecordEntry } from "src/pool-record-entries/entities/pool-record-entry.graphql.entity";
import { PoolRecordEntriesMapper } from "src/pool-record-entries/pool-record-entries.mapper";
import { Pool } from "src/pools/entities/pool.graphql.entity";
import { PoolsMapper } from "src/pools/pools.mapper";
import { DeepPartial } from "typeorm";
import { PoolRecord } from "./entities/pool-record.graphql.entity";
import { PoolRecordEntity } from "./entities/pool-record.typeorm.entity";



export class PoolRecordsMapper extends BaseMapper<PoolRecord, PoolRecordEntity> {

    async entityToDomain(entity: PoolRecordEntity): Promise<PoolRecord> {
        let entries: PoolRecordEntry[] | undefined = undefined;
        if (entity.entries) {
            const entriesMapper = new PoolRecordEntriesMapper({ domain: PoolRecordEntry});
            entries = await entriesMapper.entitiesToDomains(entity.entries);
        }
        let pool: Pool | undefined = undefined;
        if (entity.pool) {
            const poolMapper = new PoolsMapper();
            pool = await poolMapper.entityToDomain(entity.pool);
        }
        return {
            id: entity.id,
            recordDate: entity.recordDate,
            entries,
            pool,
        }
    }

    async domainToEntity(domain: PoolRecord): Promise<DeepPartial<PoolRecordEntity>> {
        return {
            id: domain.id,
            recordDate: domain.recordDate
        }
    }

}