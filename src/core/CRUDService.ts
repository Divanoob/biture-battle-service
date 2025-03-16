import { NotFoundException, Type } from "@nestjs/common";
import { DeepPartial, FindOptionsWhere, ObjectLiteral, Repository as TypeOrmRepository } from "typeorm";
import { CRUDMapper } from "./CRUDMapper";
import { MappedRelations } from "./RelationMapper";

export interface CRUDServiceOptions<
    Domain,
    Entity extends ObjectLiteral,
    CreateDto extends DeepPartial<Domain>,
    UpdateDto extends DeepPartial<Domain>,
    FindAllDto extends FindOptionsWhere<Entity>,
    FindOneDto extends FindOptionsWhere<Entity>,
    Repository extends TypeOrmRepository<Entity>
> {
    domain: Type<Domain>;
    repository: Repository;
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
    MyRepository extends TypeOrmRepository<Entity>
> {
    
    protected readonly mapper: CRUDMapper<
        Domain,
        Entity,
        CreateDto,
        UpdateDto,
        FindAllDto,
        FindOneDto
    >;
    
    public readonly repository: MyRepository;
    
    constructor(
        { mapper, domain, repository }: CRUDServiceOptions<
            Domain,
            Entity,
            CreateDto,
            UpdateDto,
            FindAllDto,
            FindOneDto,
            MyRepository
        >
    ) {
        this.mapper = new mapper({ domain });
        this.repository = repository;
    }

    abstract checkRelationsBeforeQuery(dto: CreateDto | UpdateDto): Promise<boolean>;
    
    async create(createDto: CreateDto): Promise<Domain> {
        const entity = this.repository.create(
            await this.mapper.createDtoToEntity(createDto)
        );
        //Expands
        await this.checkRelationsBeforeQuery(createDto);
        //Do the Insert
        const newEntity = await this.repository.save({ ...entity });
        return this.mapper.entityToDomain(newEntity);
    }

    async findAll(
        findAllDto: FindAllDto,
        relations: MappedRelations<Entity>,
    ): Promise<Domain[]> {
        const where = await this.mapper.findAllDtoToEntity(findAllDto);
        const drinks = await this.repository.find({
            relations,
            where,
        });
        return this.mapper.entitiesToDomains(drinks);
    }

    async findOne(
        findOneDto: FindOneDto,
        relations: MappedRelations<Entity>,
    ): Promise<Domain> {
        const where = await this.mapper.findOneDtoToEntity(findOneDto);
        const entity = await this.repository.findOne({
            where,
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
        //Retrieve current entity
        const entity = await this.repository.findOneBy(await this.mapper.findOneDtoToEntity(findOneDto));
        if (entity === null) {
            throw new NotFoundException();
        }
        //Expands
        await this.checkRelationsBeforeQuery(updateDto);
        //Do the update
        await this.repository.save({ ...entity, ...updateDto });
        return true;
    }

    async remove(findOneDto: FindOneDto): Promise<boolean> {
        const deleteResult = await this.repository.delete(
            await this.mapper.findOneDtoToEntity(findOneDto)
        );
        return !!deleteResult.affected && deleteResult.affected > 0;
    }
}