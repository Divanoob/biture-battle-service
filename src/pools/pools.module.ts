import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.typeorm.entity';
import { UsersModule } from 'src/users/users.module';
import { PoolEntity } from './entities/pool.typeorm.entity';
import { PoolsRepository } from './persistence/pools.repository';
import { PoolsResolver } from './pools.resolver';
import { PoolsService } from './pools.service';

@Module({
  imports: [TypeOrmModule.forFeature([PoolEntity, UserEntity]), UsersModule],
  providers: [PoolsResolver, PoolsService, PoolsRepository],
  exports: [PoolsRepository]
})
export class PoolsModule {}
