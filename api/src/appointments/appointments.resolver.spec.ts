import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsResolver } from './appointments.resolver';
import { AppointmentsService } from './appointments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { MockRepository } from '../mock-helper/mock.repository';
import { User } from '../users/entities/user.entity';
import * as faker from 'faker';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import mockBuilder from '../mock-helper/mock.create-query-builder';
import { CreateAppointmentInput } from './dto/create-appointment.input';

describe('AppointmentsResolver', () => {
  let resolver: AppointmentsResolver;
  let service: AppointmentsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsResolver,
        AppointmentsService,
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository,
        },
        {
          provide: getRepositoryToken(Appointment),
          useClass: MockRepository,
        },
      ],
    }).compile();

    resolver = module.get<AppointmentsResolver>(AppointmentsResolver);
    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe('Load appointments resolver', () => {
    it('Load appointments resolver', async () => {
      const patient = new User();
      patient.id = 1;
      const appointment1 = new Appointment();
      appointment1.id = faker.random.number();
      appointment1.patient = patient;
      appointment1.doctor = new User();
      appointment1.meetingTime = new Date();
      appointment1.description = faker.random.word();
      appointment1.createdAt = new Date();
      appointment1.updatedAt = new Date();

      const appointment2 = new Appointment();
      appointment2.id = faker.random.number();
      appointment2.patient = patient;
      appointment2.doctor = new User();
      appointment2.meetingTime = new Date();
      appointment2.description = faker.random.word();
      appointment2.createdAt = new Date();
      appointment2.updatedAt = new Date();
      const appointments = [appointment1, appointment2];
      const pagination = new PaginationDto();
      pagination.page = 1;
      pagination.limit = 10;
      pagination.order = 'ASC';
      pagination.filter = '';
      const expectedResult = {
        totalCount: 2,
        page: pagination.page,
        limit: pagination.limit,
        data: appointments,
      };
      const serviceSpyFindAll = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(expectedResult);
      const result = await service.findAll(patient, pagination);
      expect(result).toEqual(expectedResult);
    });
    it('Load appointment resolver', async () => {
      const patient = new User();
      patient.id = 1;
      const id = faker.random.number();
      const expectedResult = new Appointment();
      expectedResult.id = id;
      expectedResult.patient = patient;
      expectedResult.doctor = new User();
      expectedResult.meetingTime = new Date();
      expectedResult.description = faker.random.word();
      expectedResult.createdAt = new Date();
      expectedResult.updatedAt = new Date();
      const serviceSpyFindOne = jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(expectedResult);
      const result = await service.findOne(id);
      expect(result).toEqual(expectedResult);
    });
  });
  describe('Create appointment resolver', () => {
    it('Create an appointment resolver', async () => {
      const createAppointmentInput = new CreateAppointmentInput();
      createAppointmentInput.description = faker.random.word();
      createAppointmentInput.doctorId = 6;
      createAppointmentInput.meetingTime = new Date();
      const patient = new User();
      patient.id = 1;
      const doctor = new User();
      doctor.id = createAppointmentInput.doctorId;
      const id = faker.random.number();
      const expectedResult = new Appointment();
      expectedResult.id = id;
      expectedResult.patient = patient;
      expectedResult.doctor = doctor;
      expectedResult.meetingTime = createAppointmentInput.meetingTime;
      expectedResult.description = createAppointmentInput.description;
      expectedResult.createdAt = new Date();
      expectedResult.updatedAt = new Date();
      const serviceSpyCreate = jest
        .spyOn(service, 'create')
        .mockResolvedValue(expectedResult);
      const result = await service.create(createAppointmentInput, patient.id);
      expect(result).toEqual(expectedResult);
    });
  });
});
