import { DrinkEntity } from "src/drinks/entities/drink.entity.typeorm";
import { PoolRecordEntity } from "src/pool-records/entities/pool-record.entity.typeorm";
import { UserEntity } from "src/users/entities/user.entity.typeorm";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity("pools")
export class PoolEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => UserEntity, user => user.pools)
    @JoinTable()
    users?: UserEntity[];

    @CreateDateColumn()
    creationDate: Date;

    @Column({ default: true })
    isOpen: boolean;

    @ManyToMany(() => DrinkEntity, drink => drink.pools)
    drinks?: DrinkEntity[];

    @OneToMany(() => PoolRecordEntity, poolRecord => poolRecord.pool)
    records?: PoolRecordEntity[];
}