import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDiseaseInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
