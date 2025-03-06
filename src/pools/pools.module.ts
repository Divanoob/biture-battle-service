import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolEntity } from './entities/pool.entity.typeorm';
import { PoolsResolver } from './pools.resolver';
import { PoolsService } from './pools.service';

@Module({
  imports: [TypeOrmModule.forFeature([PoolEntity])],
  providers: [PoolsResolver, PoolsService],
})
export class PoolsModule {}
