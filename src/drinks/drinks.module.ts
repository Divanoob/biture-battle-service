import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/persistence/users.repository';
import { UsersModule } from 'src/users/users.module';
import { DrinksResolver } from './drinks.resolver';
import { DrinksService } from './drinks.service';
import { DrinkEntity } from './entities/drink.entity.typeorm';
import { DrinksRepository } from './persistence/drinks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DrinkEntity]), UsersModule],
  providers: [DrinksResolver, DrinksService, DrinksRepository, UsersRepository],
})
export class DrinksModule {}
