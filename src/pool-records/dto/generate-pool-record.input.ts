import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GeneratePoolRecordInput {
  @Field({ description: 'Pool ID' })
  poolId: number;
}
