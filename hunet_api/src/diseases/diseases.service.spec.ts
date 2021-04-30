import {Test, TestingModule} from '@nestjs/testing';
import {DiseasesService} from './diseases.service';
import {Repository} from 'typeorm';
import {Disease} from './entities/disease.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {MockRepository} from '../mock-helper/mock.repository';
import * as faker from 'faker';
import slugify from 'slugify';
import {PaginationDto} from '../pagination/dto/pagination.dto';
import mockBuilder from '../mock-helper/mock.create-query-builder';

describe('DiseasesService', () => {
  let service: DiseasesService;
  let repository: Repository<Disease>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiseasesService,
        {
          provide: getRepositoryToken(Disease),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<DiseasesService>(DiseasesService);
    repository = module.get(getRepositoryToken(Disease));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('Load disease', () => {
    it('Load diseases list', async () => {
      const disease1 = new Disease();
      disease1.id = faker.random.number();
      disease1.name = faker.random.word();
      disease1.description = faker.random.word();
      disease1.slug = slugify(disease1.name);
      disease1.createdAt = new Date();
      disease1.updatedAt = new Date();

      const disease2 = new Disease();
      disease2.id = faker.random.number();
      disease2.name = faker.random.word();
      disease2.description = faker.random.word();
      disease2.slug = slugify(disease2.name);
      disease2.createdAt = new Date();
      disease2.updatedAt = new Date();

      const diseases = [disease1, disease2];
      const createQueryBuilder = mockBuilder(null, diseases);
      const pagination = new PaginationDto();
      pagination.page = 1;
      pagination.limit = 10;
      pagination.order = 'ASC';
      pagination.filter = '';
      const expectedResult = {
        totalCount: 2,
        page: pagination.page,
        limit: pagination.limit,
        data: diseases,
      };
      const diseaseRepositoryCountSpy = jest
        .spyOn(repository, 'count')
        .mockResolvedValue(2);
      const query = jest
        .spyOn(repository, 'createQueryBuilder')
        .mockReturnValue(createQueryBuilder());
      const result = await service.findAll(pagination);
      expect(diseaseRepositoryCountSpy).toBeCalled();
      expect(result).toEqual(expectedResult);
      expect(createQueryBuilder().orderBy).toHaveBeenNthCalledWith(
        1,
        'created_at',
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
      expect(createQueryBuilder().getMany).toHaveBeenNthCalledWith(1);
    });
    it('Load disease', async () => {
      const id = faker.random.number();
      const expectedDisease = new Disease();
      expectedDisease.id = id;
      expectedDisease.name = faker.random.word();
      expectedDisease.description = faker.random.word();
      expectedDisease.slug = slugify(expectedDisease.name);
      expectedDisease.createdAt = new Date();
      expectedDisease.updatedAt = new Date();
      const repositorySpyFindOne = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(expectedDisease);
      const result = await service.findOne(id);
      expect(result).toEqual(expectedDisease);
      expect(repositorySpyFindOne).toHaveBeenNthCalledWith(1, id);
    });
  });
});
