import { CRUDMapper } from "src/core/CRUDMapper";
import { DeepPartial, FindOptionsWhere } from "typeorm";
import { CreateBeverageInput } from "./dto/create-beverage.input";
import { Beverage } from "./entities/beverage.entity";
import { BeverageEntity } from "./entities/beverage.entity.typeorm";


export class BeverageMapper extends CRUDMapper<Beverage, BeverageEntity, CreateBeverageInput, Beverage, Beverage, Beverage> {
    async createDtoToDomain(createDto: CreateBeverageInput): Promise<Beverage> {
        throw new Error("Method not implemented.");
    }

    async updateDtoToDomain(updateDto: Beverage): Promise<Beverage> {
        throw new Error("Method not implemented.");
    }

    async findAllDtoToEntity(findDto: Beverage): Promise<FindOptionsWhere<BeverageEntity>> {
        throw new Error("Method not implemented.");
    }

    async findOneDtoToEntity(findOneDto: Beverage): Promise<FindOptionsWhere<BeverageEntity>> {
        throw new Error("Method not implemented.");
    }

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