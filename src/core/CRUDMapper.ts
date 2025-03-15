import { DeepPartial, FindOptionsWhere } from "typeorm";
import { BaseMapper } from "./BaseMapper";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export abstract class CRUDMapper<Domain, Entity, CreateDto, UpdateDto, FindAllDto, FindOneDto> extends BaseMapper<Domain, Entity> {
    abstract createDtoToDomain(createDto: CreateDto): Promise<Domain>;
    abstract updateDtoToDomain(updateDto: UpdateDto): Promise<Domain>;

    async createDtoToEntity(createDto: CreateDto): Promise<DeepPartial<Entity>> {
        return await this.domainToEntity(await this.createDtoToDomain(createDto));
    }

    async updateDtoToEntity(updateDto: UpdateDto): Promise<DeepPartial<Entity>> {
        return await this.domainToEntity(await this.updateDtoToDomain(updateDto));
    }

    abstract findAllDtoToEntity(findDto: FindAllDto): Promise<FindOptionsWhere<Entity>>;
    abstract findOneDtoToEntity(findOneDto: FindOneDto): Promise<FindOptionsWhere<Entity>>;
}