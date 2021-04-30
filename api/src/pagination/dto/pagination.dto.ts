import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationDto {
  @Field({ description: 'Page number', nullable: true })
  page?: number;
  @Field({ description: 'Items per page', nullable: true })
  limit?: number;
  @Field({ description: 'Items Order (ASC|DESC) ', nullable: true })
  order?: 'ASC' | 'DESC';
  @Field({ description: 'Items Filter', nullable: true })
  filter?: string;
}
