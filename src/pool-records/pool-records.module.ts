import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationMapper } from 'src/core';
import { PoolRecordEntriesModule } from 'src/pool-record-entries';
import { PoolEntity, PoolsModule } from 'src/pools';
import { PoolRecordEntity } from './entities';
import { PoolRecordsRepository } from './persistence/pool-records.repository';
import { PoolRecordsResolver } from './pool-records.resolver';
import { PoolRecordsService } from './pool-records.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PoolRecordEntity, PoolEntity]),
    forwardRef(() => PoolsModule),
    forwardRef(() => PoolRecordEntriesModule)
  ],
  providers: [PoolRecordsResolver, PoolRecordsService, PoolRecordsRepository, RelationMapper<PoolRecordEntity>],
  exports: []
})
export class PoolRecordsModule {}
