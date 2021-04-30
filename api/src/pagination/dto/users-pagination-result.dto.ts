import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BasePaginationResultDto } from './base-pagination-result.dto';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class UsersPaginationResultDto extends BasePaginationResultDto {
  @Field((type) => [User])
  data: User[];
}
