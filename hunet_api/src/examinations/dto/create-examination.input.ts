import { InputType, Int, Field } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';

@InputType()
export class CreateExaminationInput {
  @Field(() => Int, { description: 'Patient ID' })
  patientId: number;

  @Field()
  image: string;

  @Field()
  resultImage: string;

  @Field()
  customerDescription: string;

  @Field()
  diseaseName: string;

  @Field()
  predict: string;

  @Field()
  status: string;
}
