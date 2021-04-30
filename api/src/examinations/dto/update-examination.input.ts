import { CreateExaminationInput } from './create-examination.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExaminationInput extends PartialType(
  CreateExaminationInput,
) {
  @Field(() => Int)
  id: number;
  @Field()
  status: string;
}
