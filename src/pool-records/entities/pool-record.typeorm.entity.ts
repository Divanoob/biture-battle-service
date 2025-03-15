import { PoolRecordEntryEntity } from "src/pool-record-entries/entities/pool-record-entry.typeorm.entity";
import { PoolEntity } from "src/pools/entities/pool.typeorm.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity("pool_records")
export class PoolRecordEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    recordDate: Date;

    @OneToMany(() => PoolRecordEntryEntity, poolRecordEntry => poolRecordEntry.record)
    entries?: PoolRecordEntryEntity[];

    @ManyToOne(() => PoolEntity, pool => pool.records)
    @JoinColumn()
    pool?: PoolEntity;
}