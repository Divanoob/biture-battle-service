import { DeepPartial } from "typeorm";


export abstract class BaseMapper<Domain, Entity> {
    abstract entityToDomain(entity: Entity): Promise<Domain>;
    abstract domainToEntity(domain: Domain): Promise<DeepPartial<Entity>>;

    async entitiesToDomains(entities: Entity[]): Promise<Domain[]> {
        const mappedElements: Domain[] = [];
        for (const entity of entities) {
            mappedElements.push(await this.entityToDomain(entity));
        }
        return mappedElements;
    }

    async domainsToEntities(domains: Domain[]): Promise<DeepPartial<Entity>[]> {
        const mappedElements: DeepPartial<Entity>[] = [];
        for (const domain of domains) {
            mappedElements.push(await this.domainToEntity(domain));
        }
        return mappedElements;
    }
}