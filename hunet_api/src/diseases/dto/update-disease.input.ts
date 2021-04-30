import { CreateDiseaseInput } from './create-disease.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDiseaseInput extends PartialType(CreateDiseaseInput) {
  @Field(() => Int)
  id: number;
}
