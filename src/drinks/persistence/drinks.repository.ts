import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DrinkEntity } from '../entities/drink.typeorm.entity';

@Injectable()
export class DrinksRepository extends Repository<DrinkEntity> {}
