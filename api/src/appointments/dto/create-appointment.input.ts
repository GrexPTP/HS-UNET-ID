import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
  @Field()
  meetingTime: Date;

  @Field({ nullable: true })
  description: string;

  @Field(() => Int)
  doctorId: number;
}
