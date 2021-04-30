import {Injectable} from '@nestjs/common';
import {CreateNewsInput} from './dto/create-news.input';
import {UpdateNewsInput} from './dto/update-news.input';
import {Repository} from 'typeorm';
import {News} from './entities/news.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {PaginationDto} from '../pagination/dto/pagination.dto';
import {NewsPaginationResultDto} from '../pagination/dto/news-pagination-result.dto';

@Injectable()
export class NewsService {
  constructor(
      @InjectRepository(News)
      private newsRepository: Repository<News>,
  ) {
  }

  create(createNewsInput: CreateNewsInput) {
    return 'This action adds a new news';
  }

  async findAll(pagination: PaginationDto): Promise<NewsPaginationResultDto> {
    if (pagination) {
      const totalCount = await this.newsRepository.count();
      const appointments = await this.newsRepository
        .createQueryBuilder('news')
        .orderBy('news.createdAt', pagination.order)
        .skip((pagination.page - 1) * pagination.limit)
        .take(pagination.limit)
        .leftJoinAndSelect('news.creator', 'creator')
        .getMany();
      return {
        totalCount,
        page: pagination.page,
        limit: pagination.limit,
        data: appointments,
      };
    }
  }

  findOne(id: number): Promise<News> {
    return this.newsRepository.findOne(id);
  }

  update(id: number, updateNewsInput: UpdateNewsInput) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
