import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BeverageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  alcoholConcentration: number;
}
