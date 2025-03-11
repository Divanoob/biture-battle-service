import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationMapper } from 'src/core/RelationMapper';
import { BeveragesResolver } from './beverages.resolver';
import { BeveragesService } from './beverages.service';
import { BeverageEntity } from './entities/beverage.entity.typeorm';
import { BeveragesRepository } from './persistence/beverages.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BeverageEntity])],
  providers: [BeveragesResolver, BeveragesService, BeveragesRepository, RelationMapper<BeverageEntity>],
})
export class BeveragesModule {}
