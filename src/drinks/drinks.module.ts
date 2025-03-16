import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationMapper } from 'src/core/RelationMapper';
import { UserEntity, UsersModule, UsersService } from 'src/users';
import { DrinksResolver } from './drinks.resolver';
import { DrinksService } from './drinks.service';
import { DrinkEntity } from './entities/drink.typeorm.entity';
import { DrinksRepository } from './persistence/drinks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DrinkEntity, UserEntity]), UsersModule],
  providers: [
    DrinksResolver,
    DrinksService,
    DrinksRepository,
    RelationMapper<DrinkEntity>,
    UsersService
  ],
  exports: [DrinksRepository],
})
export class DrinksModule {}
