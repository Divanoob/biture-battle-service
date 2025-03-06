import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolRecordEntity } from './entities/pool-record.entity.typeorm';
import { PoolRecordsResolver } from './pool-records.resolver';
import { PoolRecordsService } from './pool-records.service';

@Module({
  imports: [TypeOrmModule.forFeature([PoolRecordEntity])],
  providers: [PoolRecordsResolver, PoolRecordsService],
})
export class PoolRecordsModule {}
