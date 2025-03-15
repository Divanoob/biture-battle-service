import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationMapper } from 'src/core';
import { UserEntity } from './entities/user.typeorm.entity';
import { UsersRepository } from './persistence/users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersResolver, UsersService, UsersRepository, RelationMapper<UserEntity>],
  exports: [UsersRepository]
})
export class UsersModule {}
