import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrinksModule } from 'src/drinks';
import { PoolRecordEntity, PoolRecordsModule, PoolRecordsService } from 'src/pool-records';
import { PoolEntity, PoolsModule, PoolsService } from 'src/pools';
import { UserEntity, UsersModule, UsersService } from 'src/users';
import { PoolRecordEntryEntity } from './entities';
import { PoolRecordEntriesRepository } from './persistence/pool-record-entries.repository';
import { PoolRecordEntriesService } from './pool-record-entries.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PoolRecordEntryEntity, PoolRecordEntity, PoolEntity, UserEntity]),
    forwardRef(() => UsersModule),
    forwardRef(() => PoolsModule),
    forwardRef(() => PoolRecordsModule),
    forwardRef(() => DrinksModule)
  ],
  providers: [
    PoolRecordEntriesService,
    PoolRecordEntriesRepository,
    PoolRecordsService,
    PoolsService,
    UsersService],
  exports: [PoolRecordEntriesService],
})
export class PoolRecordEntriesModule {}
