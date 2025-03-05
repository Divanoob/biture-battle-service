import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/persistence/users.repository';
import { UsersModule } from 'src/users/users.module';
import { DrinksResolver } from './drinks.resolver';
import { DrinksService } from './drinks.service';
import { DrinkEntity } from './entities/drink.entity.typeorm';
import { DrinksRepository } from './persistence/drinks.repository';
import { UserEntity } from 'src/users/entities/user.entity.typeorm';
import { RelationMapper } from 'src/core/RelationMapper';

@Module({
  imports: [TypeOrmModule.forFeature([DrinkEntity, UserEntity]), UsersModule],
  providers: [
    DrinksResolver,
    DrinksService,
    DrinksRepository,
    UsersRepository,
    RelationMapper<DrinkEntity>,
  ],
})
export class DrinksModule {}
