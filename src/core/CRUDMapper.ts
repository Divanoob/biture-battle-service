 
import { Type } from "@nestjs/common";
import { DeepPartial, FindOptionsWhere, ObjectLiteral } from "typeorm";
import { BaseMapper } from "./BaseMapper";

export interface CRUDMapperOptions<
    Domain
> {
    domain: Type<Domain>;
}

export abstract class CRUDMapper<
    Domain,
    Entity extends ObjectLiteral,
    CreateDto extends DeepPartial<Domain>,
    UpdateDto extends DeepPartial<Domain>,
    FindAllDto extends FindOptionsWhere<Entity>,
    FindOneDto extends FindOptionsWhere<Entity>,
> extends BaseMapper<
    Domain,
    Entity
> {
    
    private readonly domain: Type<Domain>;
    
    constructor({ domain }: CRUDMapperOptions<Domain>) {
        super();
        this.domain = domain;
    }
    
    async createDtoToDomain(createDto: CreateDto): Promise<Domain> {
        const domain = new this.domain();
        return { ...domain, ...createDto };
    }

    async updateDtoToDomain(updateDto: UpdateDto): Promise<Domain> {
        const domain = new this.domain();
        return { ...domain, ...updateDto };
    }

    async createDtoToEntity(createDto: CreateDto): Promise<DeepPartial<Entity>> {
        return await this.domainToEntity(await this.createDtoToDomain(createDto));
    }

    async updateDtoToEntity(updateDto: UpdateDto): Promise<DeepPartial<Entity>> {
        return await this.domainToEntity(await this.updateDtoToDomain(updateDto));
    }

    async findAllDtoToEntity(findDto: FindAllDto): Promise<FindOptionsWhere<Entity>> {
        return findDto;
    }

    async findOneDtoToEntity(findOneDto: FindOneDto): Promise<FindOptionsWhere<Entity>> {
        return findOneDto;
    }
}