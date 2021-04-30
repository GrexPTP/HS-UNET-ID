import { Test, TestingModule } from '@nestjs/testing';
import { NewsResolver } from './news.resolver';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import * as faker from 'faker';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '../mock-helper/mock.repository';

describe('NewsResolver', () => {
  let resolver: NewsResolver;
  let service: NewsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsResolver,
        NewsService,
        {
          provide: getRepositoryToken(News),
          useClass: MockRepository,
        },
      ],
    }).compile();

    resolver = module.get<NewsResolver>(NewsResolver);
    service = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe('Get news resolver', () => {
    it('Get all news resolver', async () => {
      const news1 = new News();
      news1.id = faker.random.number();
      news1.content = faker.random.word();
      news1.createdAt = new Date();
      news1.updatedAt = new Date();
      const news2 = new News();
      news2.id = faker.random.number();
      news2.content = faker.random.word();
      news2.createdAt = new Date();
      news2.updatedAt = new Date();
      const newsList = [news1, news2];
      const pagination = new PaginationDto();
      pagination.page = 1;
      pagination.limit = 10;
      pagination.order = 'ASC';
      pagination.filter = '';
      const expectedResult = {
        totalCount: 2,
        page: pagination.page,
        limit: pagination.limit,
        data: newsList,
      };
      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(expectedResult);
      const result = await resolver.findAll(pagination);
      expect(result).toEqual(expectedResult);
      expect(findAllSpy).toHaveBeenNthCalledWith(1, pagination);
    });
    it('Get one news resolver', async () => {
      const id = faker.random.number();
      const expectedNews = new News();
      expectedNews.id = id;
      expectedNews.content = faker.random.word();
      expectedNews.createdAt = new Date();
      expectedNews.updatedAt = new Date();
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(expectedNews);
      const result = await service.findOne(id);
      expect(result).toEqual(expectedNews);
      expect(findOneSpy).toHaveBeenNthCalledWith(1, id);
    });
  });
});
