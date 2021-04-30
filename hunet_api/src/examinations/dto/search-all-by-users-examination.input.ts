import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SearchAllByUsersExaminationInput {
  @Field(() => Int, { description: 'Patient ID' })
  patientId: number;
}
