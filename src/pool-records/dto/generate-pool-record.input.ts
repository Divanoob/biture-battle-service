import { Field, InputType } from '@nestjs/graphql';
import { Pool } from 'src/pools';

@InputType()
export class GeneratePoolRecordInput {
  @Field(() => Pool, { description: 'Pool ID' })
  pool: Pool;
}
