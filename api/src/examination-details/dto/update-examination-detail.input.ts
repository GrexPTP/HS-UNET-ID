import { CreateExaminationDetailInput } from './create-examination-detail.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExaminationDetailInput extends PartialType(
  CreateExaminationDetailInput,
) {
  @Field(() => Int)
  id: number;
}
