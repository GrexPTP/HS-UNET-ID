import { Test, TestingModule } from '@nestjs/testing';
import { ExaminationDetailsResolver } from './examination-details.resolver';
import { ExaminationDetailsService } from './examination-details.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExaminationDetail } from './entities/examination-detail.entity';
import { MockRepository } from '../mock-helper/mock.repository';
import * as faker from 'faker';
import { Disease } from '../diseases/entities/disease.entity';
import { Examination } from '../examinations/entities/examination.entity';

describe('ExaminationDetailsResolver', () => {
  let resolver: ExaminationDetailsResolver;
  let service: ExaminationDetailsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExaminationDetailsResolver,
        ExaminationDetailsService,
        {
          provide: getRepositoryToken(ExaminationDetail),
          useClass: MockRepository,
        },
      ],
    }).compile();

    resolver = module.get<ExaminationDetailsResolver>(
      ExaminationDetailsResolver,
    );
    service = module.get<ExaminationDetailsService>(ExaminationDetailsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });
  describe('Test load examination detail', () => {
    it('Load examination detail', async () => {
      const id = faker.random.number();
      const expectedResult = new ExaminationDetail();
      expectedResult.id = id;
      expectedResult.disease = new Disease();
      expectedResult.examination = new Examination();
      expectedResult.percentage = faker.random.float();
      expectedResult.createdAt = new Date();
      expectedResult.updatedAt = new Date();
      const spyFindOne = jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(expectedResult);
      const result = await resolver.findOne(id);
      expect(result).toEqual(expectedResult);
    });
  });
});
