import { PoolEntity } from 'src/pools/entities/pool.entity.typeorm';
import { UserEntity } from 'src/users/entities/user.entity.typeorm';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('drinks')
export class DrinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user?: UserEntity;

  @Column()
  date: Date;

  @Column({ nullable: true })
  drinkName: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  alcoholConcentration: number;

  @Column({ type: 'float' })
  alcoholQuantity: number;

  @ManyToMany(() => PoolEntity, (pool) => pool.drinks)
  @JoinTable()
  pools?: PoolEntity[];
}
