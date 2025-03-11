import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { BeverageEntity } from "../entities/beverage.typeorm.entity";


@Injectable()
export class BeveragesRepository extends Repository<BeverageEntity> {}