import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { MockRepository } from '../mock-helper/mock.repository';
import { Repository } from 'typeorm';
import { Disease } from '../diseases/entities/disease.entity';
import * as faker from 'faker';
import slugify from 'slugify';
import mockBuilder from '../mock-helper/mock.create-query-builder';
import { PaginationDto } from '../pagination/dto/pagination.dto';

describe('CitiesService', () => {
  let service: CitiesService;
  let repository: Repository<City>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        {
          provide: getRepositoryToken(City),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
    repository = module.get(getRepositoryToken(City));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('Load cities', () => {
    it('Load cities list', async () => {
      const city1 = new City();
      city1.id = faker.random.number();
      city1.name = faker.random.word();
      city1.createdAt = new Date();
      city1.updatedAt = new Date();

      const city2 = new City();
      city2.id = faker.random.number();
      city2.name = faker.random.word();
      city2.createdAt = new Date();
      city2.updatedAt = new Date();

      const cities = [city1, city2];
      const repositorySpyFindAll = jest
        .spyOn(repository, 'find')
        .mockResolvedValue(cities);
      const result = await service.findAll();
      expect(result).toEqual(cities);
      expect(repositorySpyFindAll).toBeCalled();
    });
  });
});
