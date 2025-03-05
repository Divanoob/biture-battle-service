import { DrinkEntity } from 'src/drinks/entities/drink.entity.typeorm';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => DrinkEntity, (drink) => drink.id)
  drinks: DrinkEntity[];
}
