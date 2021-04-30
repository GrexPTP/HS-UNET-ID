import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BasePaginationResultDto } from './base-pagination-result.dto';
import { Appointment } from '../../appointments/entities/appointment.entity';

@ObjectType()
export class AppointmentsPaginationResultDto extends BasePaginationResultDto {
  @Field((type) => [Appointment], { nullable: 'items' })
  data: Appointment[];
}
