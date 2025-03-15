import { CRUDMapper } from "src/core/CRUDMapper";
import { GetByIdDto } from "src/core/dto/get-by-id.dto";
import { DeepPartial } from "typeorm";
import { CreateBeverageInput } from "./dto/create-beverage.input";
import { Beverage } from "./entities/beverage.graphql.entity";
import { BeverageEntity } from "./entities/beverage.typeorm.entity";


export class BeverageMapper extends CRUDMapper<
    Beverage,
    BeverageEntity,
    CreateBeverageInput,
    Beverage,
    Beverage,
    GetByIdDto
> {
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