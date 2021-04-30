import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BasePaginationResultDto } from './base-pagination-result.dto';
import { Examination } from '../../examinations/entities/examination.entity';

@ObjectType()
export class ExaminationsPaginationResultDto extends BasePaginationResultDto {
  @Field((type) => [Examination])
  data: Examination[];
}
