import { Module } from '@nestjs/common';
import { ExaminationDetailsService } from './examination-details.service';
import { ExaminationDetailsResolver } from './examination-details.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExaminationDetail } from './entities/examination-detail.entity';

@Module({
  providers: [ExaminationDetailsResolver, ExaminationDetailsService],
  imports: [TypeOrmModule.forFeature([ExaminationDetail])],
})
export class ExaminationDetailsModule {}
