import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PoolEntity } from "../entities/pool.typeorm.entity";

@Injectable()
export class PoolsRepository extends Repository<PoolEntity> { }
