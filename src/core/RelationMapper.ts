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

export type MappedRelations<T> = FindOptionsRelations<T>;

@Injectable()
export class RelationMapper<T extends Record<string, any>> {
  private graphRelationBuilder: GraphRelationBuilder;

  constructor(@InjectDataSource() dataSource: DataSource) {
    this.graphRelationBuilder = new GraphRelationBuilder(dataSource);
  }

  map(
    entity: string | ObjectType<T> | EntitySchema<T>,
    info: GraphQLResolveInfo,
  ): MappedRelations<T> {
    const relationMap = this.graphRelationBuilder.buildForQuery<T>(
      entity,
      info,
    );
    return relationMap.toFindOptionsRelations();
  }
}
