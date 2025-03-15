import { PoolRecordEntity } from "src/pool-records/entities/pool-record.typeorm.entity";
import { UserEntity } from "src/users/entities/user.typeorm.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity("pool_record_entries")
export class PoolRecordEntryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user?: UserEntity;

    @Column()
    alcoholLevel: number;

    @Column()
    alcoholQuantity: number;

    @ManyToOne(() => PoolRecordEntity, poolRecord => poolRecord.entries)
    @JoinColumn()
    record?: PoolRecordEntity;
}