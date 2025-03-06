import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolRecordEntryEntity } from './entities/pool-record-entry.entity.typeorm';
import { PoolRecordEntriesResolver } from './pool-record-entries.resolver';
import { PoolRecordEntriesService } from './pool-record-entries.service';

@Module({
  imports: [TypeOrmModule.forFeature([PoolRecordEntryEntity])],
  providers: [PoolRecordEntriesResolver, PoolRecordEntriesService],
})
export class PoolRecordEntriesModule {}
