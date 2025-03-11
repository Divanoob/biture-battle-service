import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { BeverageEntity } from "../entities/beverage.entity.typeorm";


@Injectable()
export class BeveragesRepository extends Repository<BeverageEntity> {}