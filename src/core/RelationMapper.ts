/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GraphQLResolveInfo } from 'graphql';
import {
  DataSource,
  EntitySchema,
  FindOptionsRelations,
  ObjectType,
} from 'typeorm';
import { GraphRelationBuilder } from 'typeorm-relations-graphql';

export type MappedRelations<Entity> = FindOptionsRelations<Entity>;

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class RelationMapper<Entity extends Record<string, any>> {
  private graphRelationBuilder: GraphRelationBuilder;

  constructor(@InjectDataSource() dataSource: DataSource) {
    this.graphRelationBuilder = new GraphRelationBuilder(dataSource);
  }

  map(
    entity: string | ObjectType<Entity> | EntitySchema<Entity>,
    info: GraphQLResolveInfo,
  ): MappedRelations<Entity> {
    const relationMap = this.graphRelationBuilder.buildForQuery<Entity>(
      entity,
      info,
    );
    return relationMap.toFindOptionsRelations();
  }
}
