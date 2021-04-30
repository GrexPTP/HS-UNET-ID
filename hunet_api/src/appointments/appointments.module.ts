import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsResolver } from './appointments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { User } from '../users/entities/user.entity';

@Module({
  providers: [AppointmentsResolver, AppointmentsService],
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    TypeOrmModule.forFeature([User]),
  ],
})
export class AppointmentsModule {}
