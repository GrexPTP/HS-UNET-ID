import { Module } from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { DiseasesResolver } from './diseases.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disease } from './entities/disease.entity';

@Module({
  providers: [DiseasesResolver, DiseasesService],
  imports: [TypeOrmModule.forFeature([Disease])],
})
export class DiseasesModule {}
