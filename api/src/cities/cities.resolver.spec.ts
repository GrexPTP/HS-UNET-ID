import { Test, TestingModule } from '@nestjs/testing';
import { CitiesResolver } from './cities.resolver';
import { CitiesService } from './cities.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { MockRepository } from '../mock-helper/mock.repository';
import * as faker from 'faker';

describe('CitiesResolver', () => {
  let resolver: CitiesResolver;
  let service: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesResolver,
        CitiesService,
        {
          provide: getRepositoryToken(City),
          useClass: MockRepository,
        },
      ],
    }).compile();

    resolver = module.get<CitiesResolver>(CitiesResolver);
    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });
  describe('Load Cities', () => {
    it('Load cities', async () => {
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

      const spyFindAll = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(cities);
      const result = await resolver.findAll();
      expect(result).toEqual(cities);
      expect(spyFindAll).toBeCalled();
    });
  });
});
