import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Pool {
  @Field(() => ID, { description: 'Pool ID' })
  id: number;
  
  @Field(() => [User], { description: 'Users', nullable: true })
  users?: User[];
  
  @Field({ description: 'Creation Date' })
  creationDate: Date;
  
  @Field({ description: 'Is the Pool Open' })
  isOpen: boolean;
}
