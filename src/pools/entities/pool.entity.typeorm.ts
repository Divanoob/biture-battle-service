import { UserEntity } from "src/users/entities/user.entity.typeorm";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity("pools")
export class PoolEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => UserEntity, user => user.pools)
    @JoinTable()
    users: UserEntity[];

    @CreateDateColumn()
    creationDate: Date;

    @Column({ default: true })
    isOpen: boolean;
}