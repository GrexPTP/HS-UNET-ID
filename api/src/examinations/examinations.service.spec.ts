import {Test, TestingModule} from '@nestjs/testing';
import {ExaminationsService} from './examinations.service';
import {Connection, Repository} from 'typeorm';
import {Examination} from './entities/examination.entity';
import {User} from '../users/entities/user.entity';
import {ExaminationDetail} from '../examination-details/entities/examination-detail.entity';
import {Disease} from '../diseases/entities/disease.entity';
import {getConnectionToken, getRepositoryToken} from '@nestjs/typeorm';
import {MockRepository} from '../mock-helper/mock.repository';
import MockConnection from '../mock-helper/mock.connection';
import {CreateExaminationInput} from './dto/create-examination.input';
import * as faker from 'faker';
import {PaginationDto} from '../pagination/dto/pagination.dto';
import mockBuilder from '../mock-helper/mock.create-query-builder';

describe('ExaminationsService', () => {
  let service: ExaminationsService;
  let examinationRep: Repository<Examination>;
  let userRep: Repository<User>;
  let detailExaminationRep: Repository<ExaminationDetail>;
  let diseaseRep: Repository<Disease>;
  let connection: Connection;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExaminationsService,
        {
          provide: getRepositoryToken(Examination),
          useClass: MockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository,
        },
        {
          provide: getRepositoryToken(ExaminationDetail),
          useClass: MockRepository,
        },
        {
          provide: getRepositoryToken(Disease),
          useClass: MockRepository,
        },
        {
          provide: getConnectionToken(),
          useClass: MockConnection,
        },
      ],
    }).compile();

    service = module.get<ExaminationsService>(ExaminationsService);
    examinationRep = module.get(getRepositoryToken(Examination));
    userRep = module.get(getRepositoryToken(User));
    detailExaminationRep = module.get(getRepositoryToken(ExaminationDetail));
    diseaseRep = module.get(getRepositoryToken(Disease));
    connection = module.get(getConnectionToken());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(examinationRep).toBeDefined();
    expect(userRep).toBeDefined();
    expect(detailExaminationRep).toBeDefined();
    expect(diseaseRep).toBeDefined();
  });
  describe('Create examination with details', () => {
    it('Create examination', async () => {
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
      // const disease1 = new Disease();
      // disease1.id = 2;
      // disease1.slug = 'pigmented';
      // disease1.name = 'Pigmented';
      // const disease2 = new Disease();
      // disease2.id = 3;
      // disease2.slug = 'carcinoma';
      // disease2.name = 'Carcinoma';
      // const disease3 = new Disease();
      // disease3.id = 4;
      // disease3.slug = 'melanoma';
      // disease3.name = 'Melanoma';
      const user = new User();
      user.id = 1;
      const findDiseaseSpy = jest
        .spyOn(diseaseRep, 'findOne')
        .mockResolvedValue(disease);
      const findPatientSpy = jest
        .spyOn(userRep, 'findOne')
        .mockResolvedValue(user);
      const expectedResult = new Examination();
      expectedResult.doctor = user;
      expectedResult.patient = user;
      expectedResult.customerDescription =
        createExaminationInput.customerDescription;
      expectedResult.image = createExaminationInput.image;
      expectedResult.resultImage = createExaminationInput.resultImage;
      expectedResult.disease = disease;
      expectedResult.status = createExaminationInput.status;
      const createQueryBuilder = mockBuilder(user, null);
      const query = jest
        .spyOn(userRep, 'createQueryBuilder')
        .mockReturnValue(createQueryBuilder());
      const result = await service.create(createExaminationInput);
      expect(result).toEqual(expectedResult);
      expect(findDiseaseSpy).toHaveBeenCalled();
      expect(findPatientSpy).toHaveBeenNthCalledWith(
        1,
        createExaminationInput.patientId,
      );
    });
  });
  describe('Load examinations', () => {
    const disease = new Disease();
    disease.id = 1;
    disease.slug = 'normal';
    disease.name = 'Normal';
    const user = new User();
    user.id = 1;
    user.examined = [new Examination(), new Examination()];
    it('Load examinations list', async () => {
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
      const createQueryBuilder = mockBuilder(null, examinations);
      const query = jest
        .spyOn(examinationRep, 'createQueryBuilder')
        .mockReturnValue(createQueryBuilder());
      const result = await service.findAll(user, pagination);
      expect(result).toEqual(expectedResult);
      expect(createQueryBuilder().orderBy).toHaveBeenNthCalledWith(
        1,
        'examination.createdAt',
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
      expect(createQueryBuilder().leftJoinAndSelect).toHaveBeenCalledWith(
        'examination.disease',
        'disease',
      );
      expect(createQueryBuilder().leftJoinAndSelect).toHaveBeenCalledWith(
        'examination.examinationDetails',
        'examination_details',
      );
      expect(createQueryBuilder().leftJoinAndSelect).toHaveBeenCalledWith(
        'examination_details.disease',
        'disease1',
      );
      expect(createQueryBuilder().leftJoinAndSelect).toHaveBeenCalledWith(
        'examination.patient',
        'patient',
      );
      expect(createQueryBuilder().leftJoinAndSelect).toHaveBeenCalledWith(
        'examination.doctor',
        'doctor',
      );
      expect(createQueryBuilder().getMany).toHaveBeenNthCalledWith(1);
    });
    it('Load one examination', async () => {
      const id = faker.random.number();
      const expectedResult = new Examination();
      expectedResult.id = id;
      expectedResult.patient = user;
      expectedResult.customerDescription = faker.random.word();
      expectedResult.image = faker.random.word();
      expectedResult.resultImage = faker.random.word();
      expectedResult.disease = disease;
      expectedResult.status = 'pending';
      const createQueryBuilder = mockBuilder(expectedResult, null);
      const query = jest
        .spyOn(examinationRep, 'createQueryBuilder')
        .mockReturnValue(createQueryBuilder());
      const result = await service.findOne(id);
      expect(result).toEqual(expectedResult);
    });
  });
});
