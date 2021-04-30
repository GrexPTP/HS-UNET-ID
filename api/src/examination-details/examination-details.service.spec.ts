import { Test, TestingModule } from '@nestjs/testing';
import { ExaminationDetailsService } from './examination-details.service';
import { Repository } from 'typeorm';
import { ExaminationDetail } from './entities/examination-detail.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '../mock-helper/mock.repository';
import * as faker from 'faker';
import { News } from '../news/entities/news.entity';
import { Disease } from '../diseases/entities/disease.entity';
import { Examination } from '../examinations/entities/examination.entity';

describe('ExaminationDetailsService', () => {
  let service: ExaminationDetailsService;
  let repository: Repository<ExaminationDetail>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExaminationDetailsService,
        {
          provide: getRepositoryToken(ExaminationDetail),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<ExaminationDetailsService>(ExaminationDetailsService);
    repository = module.get(getRepositoryToken(ExaminationDetail));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
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
      const repositorySpyFindOne = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(expectedResult);
      const result = await service.findOne(id);
      expect(result).toEqual(expectedResult);
      expect(repositorySpyFindOne).toHaveBeenNthCalledWith(1, id);
    });
  });
});
