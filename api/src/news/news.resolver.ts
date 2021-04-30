import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../permissions/entities/permission.entity';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { NewsPaginationResultDto } from '../pagination/dto/news-pagination-result.dto';
import { User } from '../users/entities/user.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
@UseGuards(GqlAuthGuard)
@Resolver(() => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  // @Mutation(() => News)
  // createNews(@Args('createNewsInput') createNewsInput: CreateNewsInput) {
  //   return this.newsService.create(createNewsInput);
  // }

  @Query(() => NewsPaginationResultDto, { name: 'allNews' })
  async findAll(
    @Args('pagination', { nullable: true }) pagination: PaginationDto,
  ): Promise<NewsPaginationResultDto> {
    return this.newsService.findAll(pagination);
  }

  @Query(() => News, { name: 'news' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.newsService.findOne(id);
  }

  // @Mutation(() => News)
  // updateNews(@Args('updateNewsInput') updateNewsInput: UpdateNewsInput) {
  //   return this.newsService.update(updateNewsInput.id, updateNewsInput);
  // }
  //
  // @Mutation(() => News)
  // removeNews(@Args('id', { type: () => Int }) id: number) {
  //   return this.newsService.remove(id);
  // }
  @ResolveField('creator', () => User)
  async news(@Parent() news: News) {
    const { creator } = news;
    return creator;
  }
}
