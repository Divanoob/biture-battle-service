import { PoolRecordEntity } from "src/pool-records/entities/pool-record.entity.typeorm";
import { UserEntity } from "src/users/entities/user.entity.typeorm";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity("pool_record_entries")
export class PoolRecordEntryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserEntity)
    user: UserEntity;

    @Column()
    alcoholLevel: number;

    @Column()
    alcoholQuantity: number;

    @ManyToOne(() => PoolRecordEntity, poolRecord => poolRecord.entries)
    @JoinColumn()
    record?: PoolRecordEntity;
}