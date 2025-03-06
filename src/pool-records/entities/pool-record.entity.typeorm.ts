import { PoolRecordEntryEntity } from "src/pool-record-entries/entities/pool-record-entry.entity.typeorm";
import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity("pool_records")
export class PoolRecordEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    recordDate: Date;

    @OneToMany(() => PoolRecordEntryEntity, poolRecordEntry => poolRecordEntry.record)
    entries: PoolRecordEntryEntity[];
}