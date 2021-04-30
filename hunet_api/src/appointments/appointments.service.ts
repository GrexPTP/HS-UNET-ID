import { Injectable, Logger } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { AppointmentsPaginationResultDto } from '../pagination/dto/appointments-pagination-result.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}
  async create(
    createAppointmentInput: CreateAppointmentInput,
    userId: number,
  ): Promise<Appointment> {
    const appointment = new Appointment();
    appointment.meetingTime = createAppointmentInput.meetingTime;
    appointment.description = createAppointmentInput.description;
    const doctor = await this.usersRepository.findOne(
      createAppointmentInput.doctorId,
    );
    appointment.doctor = doctor;
    const patient = await this.usersRepository.findOne(userId);
    appointment.patient = patient;
    return this.appointmentRepository.save(appointment);
  }

  async findAll(
    user: User,
    pagination: PaginationDto,
  ): Promise<AppointmentsPaginationResultDto> {
    const totalCount = await this.appointmentRepository.count();
    let appointments = [];
    if (pagination.filter) {
      const data = JSON.parse(pagination.filter);
      if (data.date && data.status) {
        const start = new Date(data.date);
        start.setUTCHours(0, 0, 0, 0);
        const end = new Date(data.date);
        end.setUTCHours(23, 59, 59, 999);
        appointments = await this.appointmentRepository
          .createQueryBuilder('appointment')
          .where('patient_id= :patient_id', { patient_id: user.id })
          .where('meeting_time >= :start', { start: start })
          .andWhere('meeting_time < :end', { end: end })
          .andWhere('status >= :status', { status: data.status })
          .orderBy('appointment.createdAt', pagination.order)
          .skip((pagination.page - 1) * pagination.limit)
          .take(pagination.limit)
          .leftJoinAndSelect('appointment.patient', 'patient')
          .leftJoinAndSelect('appointment.doctor', 'doctor')
          .getMany();
      } else if (data.date) {
        const start = new Date(data.date);
        start.setUTCHours(0, 0, 0, 0);
        const end = new Date(data.date);
        end.setUTCHours(23, 59, 59, 999);
        appointments = await this.appointmentRepository
          .createQueryBuilder('appointment')
          .where('patient_id= :patient_id', { patient_id: user.id })
          .where('meeting_time >= :start', { start: start })
          .andWhere('meeting_time < :end', { end: end })
          .orderBy('appointment.createdAt', pagination.order)
          .skip((pagination.page - 1) * pagination.limit)
          .take(pagination.limit)
          .leftJoinAndSelect('appointment.patient', 'patient')
          .leftJoinAndSelect('appointment.doctor', 'doctor')
          .getMany();
      } else if (data.status) {
        appointments = await this.appointmentRepository
          .createQueryBuilder('appointment')
          .where('patient_id= :patient_id', { patient_id: user.id })
          .where('status >= :status', { status: data.status })
          .orderBy('appointment.createdAt', pagination.order)
          .skip((pagination.page - 1) * pagination.limit)
          .take(pagination.limit)
          .leftJoinAndSelect('appointment.patient', 'patient')
          .leftJoinAndSelect('appointment.doctor', 'doctor')
          .getMany();
      }
    } else {
      appointments = await this.appointmentRepository
        .createQueryBuilder('appointment')
        .where('patient_id= :patient_id', { patient_id: user.id })
        .orderBy('appointment.createdAt', pagination.order)
        .skip((pagination.page - 1) * pagination.limit)
        .take(pagination.limit)
        .leftJoinAndSelect('appointment.patient', 'patient')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .getMany();
    }
    return {
      totalCount,
      page: pagination.page,
      limit: pagination.limit,
      data: appointments,
    };
  }

  findOne(id: number): Promise<Appointment> {
    return this.appointmentRepository.findOne(id);
  }

  update(id: number, updateAppointmentInput: UpdateAppointmentInput) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
