import { Test, TestingModule } from '@nestjs/testing';
import { ExaminationsResolver } from './examinations.resolver';
import { ExaminationsService } from './examinations.service';
import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';
import { Examination } from './entities/examination.entity';
import { MockRepository } from '../mock-helper/mock.repository';
import MockConnection from '../mock-helper/mock.connection';
import { User } from '../users/entities/user.entity';
import { Disease } from '../diseases/entities/disease.entity';
import { ExaminationDetail } from '../examination-details/entities/examination-detail.entity';
import { CreateExaminationInput } from './dto/create-examination.input';
import * as faker from 'faker';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import mockBuilder from '../mock-helper/mock.create-query-builder';

describe('ExaminationsResolver', () => {
  let resolver: ExaminationsResolver;
  let service: ExaminationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExaminationsResolver,
        ExaminationsService,
        {
          provide: getRepositoryToken(Examination),
          useClass: MockRepository,
        },
        {
          provide: getConnectionToken(),
          useClass: MockConnection,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository,
        },
        {
          provide: getRepositoryToken(Disease),
          useClass: MockRepository,
        },
        {
          provide: getRepositoryToken(ExaminationDetail),
          useClass: MockRepository,
        },
      ],
    }).compile();

    resolver = module.get<ExaminationsResolver>(ExaminationsResolver);
    service = module.get<ExaminationsService>(ExaminationsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });
  describe('Get appointment resolver', () => {
    const disease = new Disease();
    disease.id = 1;
    disease.slug = 'normal';
    disease.name = 'Normal';
    const user = new User();
    user.id = 1;
    user.examined = [new Examination(), new Examination()];
    it('Get all appointment resolver', async () => {
      const examination1 = new Examination();
      examination1.patient = user;
      examination1.customerDescription = faker.random.word();
      examination1.image = faker.random.word();
      examination1.resultImage = faker.random.word();
      examination1.disease = disease;
      examination1.status = 'pending';
      const examination2 = new Examination();
      examination2.patient = user;
      examination2.customerDescription = faker.random.word();
      examination2.image = faker.random.word();
      examination2.resultImage = faker.random.word();
      examination2.disease = disease;
      examination2.status = 'pending';
      const examinations = [examination1, examination2];
      const pagination = new PaginationDto();
      pagination.page = 1;
      pagination.limit = 10;
      pagination.order = 'ASC';
      pagination.filter = '';
      const expectedResult = {
        totalCount: 2,
        page: pagination.page,
        limit: pagination.limit,
        data: examinations,
      };
      const findExaminationsSpy = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(expectedResult);
      const result = await service.findAll(user, pagination);
      expect(result).toEqual(expectedResult);
    });
    it('Get an appointment resolver', async () => {
      const id = faker.random.number();
      const expectedResult = new Examination();
      expectedResult.id = id;
      expectedResult.patient = user;
      expectedResult.customerDescription = faker.random.word();
      expectedResult.image = faker.random.word();
      expectedResult.resultImage = faker.random.word();
      expectedResult.disease = disease;
      expectedResult.status = 'pending';
      const findExaminationSpy = jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(expectedResult);
      const result = await service.findOne(id);
      expect(result).toEqual(expectedResult);
    });
  });
  describe('Create appointment resolver', () => {
    it('Create an appointment resolver', async () => {
      const predict = [{ normal: 1, pigmented: 1, melanoma: 1, carcinoma: 1 }];
      const createExaminationInput: CreateExaminationInput = {
        customerDescription: faker.random.word(),
        diseaseName: 'normal',
        image: faker.random.word(),
        resultImage: faker.random.word(),
        patientId: 1,
        predict: JSON.stringify(predict),
        status: 'pending',
      };

      const disease = new Disease();
      disease.id = 1;
      disease.slug = 'normal';
      disease.name = 'Normal';
      const user = new User();
      user.id = 1;

      const expectedResult = new Examination();
      expectedResult.doctor = user;
      expectedResult.patient = user;
      expectedResult.customerDescription =
        createExaminationInput.customerDescription;
      expectedResult.image = createExaminationInput.image;
      expectedResult.resultImage = createExaminationInput.resultImage;
      expectedResult.disease = disease;
      expectedResult.status = createExaminationInput.status;
      const createExaminationSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValue(expectedResult);
      const result = await service.create(createExaminationInput);
      expect(result).toEqual(expectedResult);
    });
  });
});
