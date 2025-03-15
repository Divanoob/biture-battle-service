import { DrinkEntity } from 'src/drinks/entities/drink.typeorm.entity';
import { PoolRecordEntryEntity } from 'src/pool-record-entries/entities/pool-record-entry.typeorm.entity';
import { PoolEntity } from 'src/pools/entities/pool.typeorm.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  encryptedPassword: string;

  @OneToMany(() => DrinkEntity, (drink) => drink.user)
  drinks?: DrinkEntity[];

  @ManyToMany(() => PoolEntity, (pool) => pool.users)
  pools?: PoolEntity[];

  @OneToMany(() => PoolRecordEntryEntity, (poolRecordEntry) => poolRecordEntry.user)
  poolRecordEntries?: PoolRecordEntryEntity[];
}
