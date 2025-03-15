import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UsersModule } from 'src/users';
import { PoolEntity } from './entities';
import { PoolsRepository } from './persistence/pools.repository';
import { PoolsResolver } from './pools.resolver';
import { PoolsService } from './pools.service';

@Module({
  imports: [TypeOrmModule.forFeature([PoolEntity, UserEntity]), UsersModule],
  providers: [PoolsResolver, PoolsService, PoolsRepository],
  exports: [PoolsRepository]
})
export class PoolsModule {}
