import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrinksModule } from 'src/drinks';
import { PoolRecordEntity, PoolRecordsModule } from 'src/pool-records';
import { PoolRecordEntryEntity } from './entities';
import { PoolRecordEntriesRepository } from './persistence/pool-record-entries.repository';
import { PoolRecordEntriesService } from './pool-record-entries.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PoolRecordEntryEntity, PoolRecordEntity]),
    forwardRef(() => PoolRecordsModule),
    forwardRef(() => DrinksModule)
  ],
  providers: [PoolRecordEntriesService, PoolRecordEntriesRepository],
  exports: [PoolRecordEntriesService],
})
export class PoolRecordEntriesModule {}
