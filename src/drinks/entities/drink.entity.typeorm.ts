import { UserEntity } from 'src/users/entities/user.entity.typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity("drinks")
export class DrinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;

  @Column()
  alcoholQuantity: number;

  @Column()
  date: Date;
}
