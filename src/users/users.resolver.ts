import { Inject } from '@nestjs/common';
import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { RelationMapper } from 'src/core';
import { CreateUserInput, GetUsersInput, UpdateUserNameInput, UpdateUserPasswordInput } from './dto';
import { User, UserEntity } from './entities';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @Inject() private readonly service: UsersService,
    @Inject()
    private readonly relationMapper: RelationMapper<UserEntity>
  ) { }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.service.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(
    @Args() userDto: GetUsersInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return await this.service.findAll(userDto, this.relationMapper.map(UserEntity, info));
  }

  @Query(() => User, { name: 'user' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo
  ) {
    return await this.service.findOne({ id }, this.relationMapper.map(UserEntity, info));
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
    return await this.service.remove({ id });
  }
}
