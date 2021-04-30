import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BasePaginationResultDto } from './base-pagination-result.dto';
import { News } from '../../news/entities/news.entity';

@ObjectType()
export class NewsPaginationResultDto extends BasePaginationResultDto {
  @Field((type) => [News])
  data: News[];
}
