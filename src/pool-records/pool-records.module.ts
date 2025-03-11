import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolEntity } from 'src/pools/entities/pool.entity.typeorm';
import { PoolsModule } from 'src/pools/pools.module';
import { PoolRecordEntity } from './entities/pool-record.entity.typeorm';
import { PoolRecordsRepository } from './persistence/pool-records.repository';
import { PoolRecordsResolver } from './pool-records.resolver';
import { PoolRecordsService } from './pool-records.service';

@Module({
  imports: [TypeOrmModule.forFeature([PoolRecordEntity, PoolEntity]), PoolsModule],
  providers: [PoolRecordsResolver, PoolRecordsService, PoolRecordsRepository],
  exports: [PoolRecordsRepository]
})
export class PoolRecordsModule {}
