import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/constants';
import { User } from '../users/entities/user.entity';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { AppointmentsPaginationResultDto } from '../pagination/dto/appointments-pagination-result.dto';
import { Disease } from '../diseases/entities/disease.entity';
import { ExaminationDetail } from '../examination-details/entities/examination-detail.entity';
@UseGuards(GqlAuthGuard)
@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Mutation(() => Appointment)
  createAppointment(
    @CurrentUser() user: User,
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentInput,
  ) {
    return this.appointmentsService.create(createAppointmentInput, user.id);
  }

  @Query(() => AppointmentsPaginationResultDto, { name: 'appointments' })
  async findAll(
    @CurrentUser() user: User,
    @Args('pagination', { nullable: true }) pagination: PaginationDto,
  ): Promise<AppointmentsPaginationResultDto> {
    if (pagination) {
      return this.appointmentsService.findAll(user, pagination);
    } else {
      return {
        data: user.appointmentAttendant,
      };
    }
  }

  @Query(() => Appointment, { name: 'appointment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.appointmentsService.findOne(id);
  }

  // @Mutation(() => Appointment)
  // updateAppointment(
  //   @Args('updateAppointmentInput')
  //   updateAppointmentInput: UpdateAppointmentInput,
  // ) {
  //   return this.appointmentsService.update(
  //     updateAppointmentInput.id,
  //     updateAppointmentInput,
  //   );
  // }
  //
  // @Mutation(() => Appointment)
  // removeAppointment(@Args('id', { type: () => Int }) id: number) {
  //   return this.appointmentsService.remove(id);
  // }
  @ResolveField('doctor', () => User)
  async doctor(@Parent() appointment: Appointment) {
    const { doctor } = appointment;
    return doctor;
  }
  @ResolveField('patient', () => User)
  async patient(@Parent() appointment: Appointment) {
    const { patient } = appointment;
    return patient;
  }
}
