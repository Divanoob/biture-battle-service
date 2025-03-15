import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { GetUsersInput } from './dto/get-users.input';
import { UpdateUserNameInput } from './dto/update-user-name.input';
import { UpdateUserPasswordInput } from './dto/update-user-password.input';
import { User } from './entities/user.graphql.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.service.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(@Args() userDto: GetUsersInput) {
    return await this.service.findAll(userDto);
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.service.findOne(id);
  }

  @Mutation(() => Boolean)
  async updateUserName(
    @Args('updateUserNameInput') updateUserNameInput: UpdateUserNameInput,
  ) {
    return await this.service.updateName(
      updateUserNameInput.id,
      updateUserNameInput,
    );
  }

  @Mutation(() => Boolean)
  async updateUserPassword(
    @Args('updateUserPasswordInput')
    updateUserPasswordInput: UpdateUserPasswordInput,
  ) {
    return await this.service.updatePassword(
      updateUserPasswordInput.id,
      updateUserPasswordInput,
    );
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return await this.service.remove(id);
  }
}
