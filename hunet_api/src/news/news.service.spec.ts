import {Test, TestingModule} from '@nestjs/testing';
import {NewsService} from './news.service';
import {Repository} from 'typeorm';

import {News} from './entities/news.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {MockRepository} from '../mock-helper/mock.repository';
import * as faker from 'faker';
import {PaginationDto} from '../pagination/dto/pagination.dto';
import mockBuilder from '../mock-helper/mock.create-query-builder';

describe('NewsService', () => {
  let service: NewsService;
  let newsRepository: Repository<News>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: getRepositoryToken(News),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
    newsRepository = module.get(getRepositoryToken(News));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(newsRepository).toBeDefined();
  });
  describe('Load news', () => {
    it('Load news list', async () => {
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
      const createQueryBuilder = mockBuilder(null, newsList);
      const newsRepositoryCountSpy = jest
        .spyOn(newsRepository, 'count')
        .mockResolvedValue(2);
      const query = jest
        .spyOn(newsRepository, 'createQueryBuilder')
        .mockReturnValue(createQueryBuilder());
      const result = await service.findAll(pagination);
      expect(newsRepositoryCountSpy).toBeCalled();
      expect(result).toEqual(expectedResult);
      expect(createQueryBuilder().orderBy).toHaveBeenNthCalledWith(
        1,
        'news.createdAt',
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
      expect(createQueryBuilder().leftJoinAndSelect).toHaveBeenNthCalledWith(
        1,
        'news.creator',
        'creator',
      );
      expect(createQueryBuilder().getMany).toHaveBeenNthCalledWith(1);
    });
    it('Load one news', async () => {
      const id = faker.random.number();
      const expectedNews = new News();
      expectedNews.id = id;
      expectedNews.content = faker.random.word();
      expectedNews.createdAt = new Date();
      expectedNews.updatedAt = new Date();
      const repositorySpyFindOne = jest
        .spyOn(newsRepository, 'findOne')
        .mockResolvedValue(expectedNews);
      const result = await service.findOne(id);
      expect(result).toEqual(expectedNews);
      expect(repositorySpyFindOne).toHaveBeenNthCalledWith(1, id);
    });
  });
});
