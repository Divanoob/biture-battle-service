import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PoolRecordEntryEntity } from "../entities/pool-record-entry.typeorm.entity";


@Injectable()
export class PoolRecordEntriesRepository extends Repository<PoolRecordEntryEntity> {}