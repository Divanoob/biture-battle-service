import { BaseMapper } from "src/core/BaseMapper";
import { DeepPartial } from "typeorm";
import { Beverage } from "./entities/beverage.entity";
import { BeverageEntity } from "./entities/beverage.entity.typeorm";


export class BeverageMapper extends BaseMapper<Beverage, BeverageEntity> {
    async entityToDomain(entity: BeverageEntity): Promise<Beverage> {
        return {
            ...entity
        }
    }
    async domainToEntity(domain: Beverage): Promise<DeepPartial<BeverageEntity>> {
        return {
            ...domain
        }
    }

}