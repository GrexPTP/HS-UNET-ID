import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BasePaginationResultDto {
  @Field((type) => Int, { nullable: true })
  page?: number;
  @Field((type) => Int, { nullable: true })
  limit?: number;
  @Field((type) => Int, { nullable: true })
  totalCount?: number;
}
