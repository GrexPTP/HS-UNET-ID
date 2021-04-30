import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BasePaginationResultDto } from './base-pagination-result.dto';
import { Disease } from '../../diseases/entities/disease.entity';

@ObjectType()
export class DiseasesPaginationResultDto extends BasePaginationResultDto {
  @Field((type) => [Disease])
  data: Disease[];
}
