import { CRUDMapper } from "src/core/CRUDMapper";
import { GetByIdDto } from "src/core/dto/get-by-id.dto";
import { PoolRecord } from "src/pool-records/entities/pool-record.graphql.entity";
import { PoolRecordsMapper } from "src/pool-records/pool-records.mapper";
import { User } from "src/users/entities/user.graphql.entity";
import { UsersMapper } from "src/users/users.mapper";
import { DeepPartial, FindOptionsWhere } from "typeorm";
import { CreatePoolRecordEntryInput } from "./dto/create-pool-record-entry.input";
import { FindAllPoolRecordEntriesInput } from "./dto/find-all-pool-record-entry.input";
import { UpdatePoolRecordEntryInput } from "./dto/update-pool-record-entry.input";
import { PoolRecordEntry } from "./entities/pool-record-entry.graphql.entity";
import { PoolRecordEntryEntity } from "./entities/pool-record-entry.typeorm.entity";


export class PoolRecordEntriesMapper extends CRUDMapper<
    PoolRecordEntry,
    PoolRecordEntryEntity,
    CreatePoolRecordEntryInput,
    UpdatePoolRecordEntryInput,
    FindAllPoolRecordEntriesInput,
    GetByIdDto
> {
    
    async createDtoToDomain(createDto: CreatePoolRecordEntryInput): Promise<PoolRecordEntry> {
        const poolRecordEntry = new PoolRecordEntry();
        return { ...poolRecordEntry, ...createDto };
    }

    async updateDtoToDomain(updateDto: UpdatePoolRecordEntryInput): Promise<PoolRecordEntry> {
        const poolRecordEntry = new PoolRecordEntry();
        return { ...poolRecordEntry, ...updateDto };
    }

    async findAllDtoToEntity(findDto: FindAllPoolRecordEntriesInput): Promise<FindOptionsWhere<PoolRecordEntryEntity>> {
        return findDto;
    }

    async findOneDtoToEntity(findOneDto: GetByIdDto): Promise<FindOptionsWhere<PoolRecordEntryEntity>> {
        return findOneDto;
    }

    async entityToDomain(entity: PoolRecordEntryEntity): Promise<PoolRecordEntry> {
        let user: User | undefined = undefined;
        if (entity.user) {
            const usersMapper = new UsersMapper();
            user = await usersMapper.entityToDomain(entity.user);
        }
        let record: PoolRecord | undefined = undefined;
        if (entity.record) {
            const poolRecordsMapper = new PoolRecordsMapper({ domain: PoolRecord });
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