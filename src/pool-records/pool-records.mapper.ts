import { CRUDMapper, GetByIdDto } from "src/core";
import { PoolRecordEntriesMapper, PoolRecordEntry } from "src/pool-record-entries";
import { Pool, PoolsMapper } from "src/pools";
import { DeepPartial } from "typeorm";
import { FindAllPoolRecordsInput } from "./dto";
import { PoolRecord, PoolRecordEntity } from "./entities";



export class PoolRecordsMapper extends CRUDMapper<
    PoolRecord,
    PoolRecordEntity,
    PoolRecord,
    PoolRecord,
    FindAllPoolRecordsInput,
    GetByIdDto
> {

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