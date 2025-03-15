import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PoolRecordEntity } from "../entities/pool-record.typeorm.entity";


@Injectable()
export class PoolRecordsRepository extends Repository<PoolRecordEntity> {}