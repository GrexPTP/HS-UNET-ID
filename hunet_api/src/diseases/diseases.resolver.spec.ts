import {Test, TestingModule} from '@nestjs/testing';
import {DiseasesResolver} from './diseases.resolver';
import {DiseasesService} from './diseases.service';
import {PaginationDto} from '../pagination/dto/pagination.dto';
import {Disease} from './entities/disease.entity';
import slugify from 'slugify';
import {getRepositoryToken} from '@nestjs/typeorm';
import {MockRepository} from '../mock-helper/mock.repository';
import * as faker from 'faker';

describe('DiseasesResolver', () => {
  let resolver: DiseasesResolver;
  let service: DiseasesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiseasesResolver,
        DiseasesService,
        {
          provide: getRepositoryToken(Disease),
          useClass: MockRepository,
        },
      ],
    }).compile();

    resolver = module.get<DiseasesResolver>(DiseasesResolver);
    service = module.get<DiseasesService>(DiseasesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });
  describe('Get diseases resolver', () => {
    it('Get all diseases resolver', async () => {
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
      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(expectedResult);
      const result = await resolver.findAll(pagination);
      expect(result).toEqual(expectedResult);
      expect(findAllSpy).toHaveBeenNthCalledWith(1, pagination);
    });
    it('Get one disease resolver', async () => {
      const id = faker.random.number();
      const expectedDisease = new Disease();
      expectedDisease.id = id;
      expectedDisease.name = faker.random.word();
      expectedDisease.description = faker.random.word();
      expectedDisease.slug = slugify(expectedDisease.name);
      expectedDisease.createdAt = new Date();
      expectedDisease.updatedAt = new Date();
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(expectedDisease);
      const result = await service.findOne(id);
      expect(result).toEqual(expectedDisease);
      expect(findOneSpy).toHaveBeenNthCalledWith(1, id);
    });
  });
});
