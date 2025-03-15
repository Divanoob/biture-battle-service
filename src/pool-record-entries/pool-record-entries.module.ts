import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrinksModule } from 'src/drinks';
import { PoolRecordEntity } from 'src/pool-records/entities/pool-record.typeorm.entity';
import { PoolRecordsModule } from 'src/pool-records/pool-records.module';
import { PoolRecordEntryEntity } from './entities/pool-record-entry.typeorm.entity';
import { PoolRecordEntriesRepository } from './persistence/pool-record-entries.repository';
import { PoolRecordEntriesService } from './pool-record-entries.service';

@Module({
  imports: [TypeOrmModule.forFeature([PoolRecordEntryEntity, PoolRecordEntity]), PoolRecordsModule, DrinksModule],
  providers: [PoolRecordEntriesService, PoolRecordEntriesRepository],
  exports: [PoolRecordEntriesService],
})
export class PoolRecordEntriesModule {}
