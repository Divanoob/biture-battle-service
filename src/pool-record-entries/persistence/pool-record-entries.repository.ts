import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PoolRecordEntryEntity } from "../entities/pool-record-entry.entity.typeorm";


@Injectable()
export class PoolRecordEntriesRepository extends Repository<PoolRecordEntryEntity> {}