import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import * as fs from 'fs';
import { printSchema } from 'graphql';
import { AppModule } from './app.module';
import { BeveragesResolver } from './beverages/beverages.resolver';
import { DrinksResolver } from './drinks/drinks.resolver';
import { PoolRecordsResolver } from './pool-records';
import { PoolsResolver } from './pools/pools.resolver';
import { UsersResolver } from './users/users.resolver';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}


async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([
    UsersResolver,
    BeveragesResolver,
    PoolsResolver,
    PoolRecordsResolver,
    DrinksResolver
  ]);
  fs.writeFileSync('schema.graphql', printSchema(schema));
}

if (process.argv.includes('--generate-schema')) {
  void generateSchema();
} else {
  void bootstrap();
}