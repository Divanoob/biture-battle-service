import { DrinkEntity } from "src/drinks/entities/drink.typeorm.entity";
import { PoolRecordEntity } from "src/pool-records/entities/pool-record.typeorm.entity";
import { UserEntity } from "src/users/entities/user.typeorm.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity("pools")
export class PoolEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

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