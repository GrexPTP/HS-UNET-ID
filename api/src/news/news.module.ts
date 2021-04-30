import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsResolver } from './news.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';

@Module({
  providers: [NewsResolver, NewsService],
  imports: [TypeOrmModule.forFeature([News])],
})
export class NewsModule {}
