import {CreateScheduleInput} from './create-schedule.input';
import {Field, InputType, Int, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateScheduleInput extends PartialType(CreateScheduleInput) {
  @Field(() => Int)
  id: number;
}
