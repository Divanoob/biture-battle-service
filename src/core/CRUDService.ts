import { NotFoundException, Type } from "@nestjs/common";
import { DeepPartial, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { CRUDMapper } from "./CRUDMapper";
import { MappedRelations } from "./RelationMapper";

export interface CRUDServiceOptions<
    Domain,
    Entity extends ObjectLiteral,
    CreateDto extends DeepPartial<Domain>,
    UpdateDto extends DeepPartial<Domain>,
    FindAllDto extends FindOptionsWhere<Entity>,
    FindOneDto extends FindOptionsWhere<Entity>,
    MyRepository extends Repository<Entity>
> {
    domain: Type<Domain>;
    entity: Type<Entity>;
    createDto: Type<CreateDto>;
    updateDto: Type<UpdateDto>;
    findAllDto: Type<FindAllDto>;
    findOneDto: Type<FindOneDto>;
    repository: Type<MyRepository>;
    mapper: Type<CRUDMapper<
        Domain,
        Entity,
        CreateDto,
        UpdateDto,
        FindAllDto,
        FindOneDto
    >>;
}

export abstract class CRUDService<
    Domain,
    Entity extends ObjectLiteral,
    CreateDto extends DeepPartial<Domain>,
    UpdateDto extends DeepPartial<Domain>,
    FindAllDto extends FindOptionsWhere<Entity>,
    FindOneDto extends FindOptionsWhere<Entity>,
    MyRepository extends Repository<Entity>
> {
    
    private readonly mapper: CRUDMapper<
        Domain,
        Entity,
        CreateDto,
        UpdateDto,
        FindAllDto,
        FindOneDto
    >;
    
    constructor(
        exportServiceOptions: CRUDServiceOptions<
            Domain,
            Entity,
            CreateDto,
            UpdateDto,
            FindAllDto,
            FindOneDto,
            MyRepository
        >,
        private readonly repository: MyRepository
    ) {
        this.mapper = new exportServiceOptions.mapper();
    }

    abstract checkRelationsBeforeQuery(): Promise<boolean>;
    
    async create(createDto: CreateDto): Promise<Domain> {
        const entity = this.repository.create(await this.mapper.createDtoToEntity(createDto));
        //Expands
        await this.checkRelationsBeforeQuery();
        //Do the Insert
        const newEntity = await this.repository.save({ ...entity });
        return this.mapper.entityToDomain(newEntity);
    }

    async findAll(
        findAllDto: FindAllDto,
        relations: MappedRelations<Entity>,
    ): Promise<Domain[]> {
        const drinks = await this.repository.find({
            relations,
            where: await this.mapper.findAllDtoToEntity(findAllDto),
        });
        return this.mapper.entitiesToDomains(drinks);
    }

    async findOne(
        findOneDto: FindOneDto,
        relations: MappedRelations<Entity>,
    ): Promise<Domain> {
        const entity = await this.repository.findOne({
            where: await this.mapper.findOneDtoToEntity(findOneDto),
            relations,
        });
        if (entity === null) {
            throw new NotFoundException();
        }
        return this.mapper.entityToDomain(entity);
    }

    async update(
        findOneDto: FindOneDto,
        updateDto: UpdateDto,
    ): Promise<boolean> {
        //Retrieve current entitty
        const entity = await this.repository.findOneBy(await this.mapper.findOneDtoToEntity(findOneDto));
        if (entity === null) {
            throw new NotFoundException();
        }
        //Expands
        await this.checkRelationsBeforeQuery();
        //Do the update
        await this.repository.save({ ...entity, ...updateDto });
        return true;
    }

    async remove(findOneDto: FindOneDto): Promise<boolean> {
        const deleteResult = await this.repository.delete(await this.mapper.findOneDtoToEntity(findOneDto));
        return !!deleteResult.affected && deleteResult.affected > 0;
    }
}