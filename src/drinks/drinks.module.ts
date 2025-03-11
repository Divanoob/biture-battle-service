import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationMapper } from 'src/core/RelationMapper';
import { UserEntity } from 'src/users/entities/user.entity.typeorm';
import { UsersModule } from 'src/users/users.module';
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
  ],
})
export class DrinksModule {}
