import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export class CreateScheduleInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}