import { DrinkEntity } from 'src/drinks/entities/drink.entity.typeorm';
import { PoolRecordEntryEntity } from 'src/pool-record-entries/entities/pool-record-entry.entity.typeorm';
import { PoolEntity } from 'src/pools/entities/pool.entity.typeorm';
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
