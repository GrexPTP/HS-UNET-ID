import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { MockRepository } from '../mock-helper/mock.repository';
import * as faker from 'faker';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import mockBuilder from '../mock-helper/mock.create-query-builder';
import { CreateAppointmentInput } from './dto/create-appointment.input';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let repository: Repository<Appointment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getRepositoryToken(Appointment),
          useClass: MockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    repository = module.get(getRepositoryToken(Appointment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('Load appointment', () => {
    it('Load appointments list', async () => {
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
      const createQueryBuilder = mockBuilder(null, appointments);
      const repositorySpyCount = jest
        .spyOn(repository, 'count')
        .mockResolvedValue(2);
      const query = jest
        .spyOn(repository, 'createQueryBuilder')
        .mockReturnValue(createQueryBuilder());
      const result = await service.findAll(patient, pagination);
      expect(repositorySpyCount).toBeCalled();
      expect(result).toEqual(expectedResult);
      expect(createQueryBuilder().orderBy).toHaveBeenNthCalledWith(
        1,
        'appointment.createdAt',
        pagination.order,
      );
      expect(createQueryBuilder().skip).toHaveBeenNthCalledWith(
        1,
        (pagination.page - 1) * pagination.limit,
      );
      expect(createQueryBuilder().take).toHaveBeenNthCalledWith(
        1,
        pagination.limit,
      );
      expect(createQueryBuilder().leftJoinAndSelect).toBeCalledTimes(2);
      expect(createQueryBuilder().getMany).toBeCalledTimes(1);
    });
    it('Load one appointment', async () => {
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
      const repositorySpyFindOne = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(expectedResult);
      const result = await service.findOne(id);
      expect(result).toEqual(expectedResult);
    });
  });
  describe('Create an appointment', () => {
    it('Create an appointment', async () => {
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
      const repositorySpyCreate = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(expectedResult);
      const result = await service.create(createAppointmentInput, patient.id);
      expect(result).toEqual(expectedResult);
    });
  });
});
