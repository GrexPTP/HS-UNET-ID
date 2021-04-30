import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateExaminationDetailInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
