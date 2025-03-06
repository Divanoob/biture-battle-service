import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrinksModule } from './drinks/drinks.module';
import { UsersModule } from './users/users.module';
import { PoolsModule } from './pools/pools.module';
import { PoolRecordsModule } from './pool-records/pool-records.module';
import { PoolRecordEntriesModule } from './pool-record-entries/pool-record-entries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'biture_battle',
      entities: [__dirname + '/../**/*.entity.typeorm.js'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    DrinksModule,
    UsersModule,
    PoolsModule,
    PoolRecordsModule,
    PoolRecordEntriesModule,
  ],
})
export class AppModule {}
