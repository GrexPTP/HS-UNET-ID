import { Module } from '@nestjs/common';
import { ExaminationsService } from './examinations.service';
import { ExaminationsResolver } from './examinations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { RolesModule } from '../roles/roles.module';
import { Examination } from './entities/examination.entity';
import { Disease } from '../diseases/entities/disease.entity';
import { UsersModule } from '../users/users.module';
import { DiseasesModule } from '../diseases/diseases.module';
import { ExaminationDetailsModule } from '../examination-details/examination-details.module';
import { ExaminationDetail } from '../examination-details/entities/examination-detail.entity';

@Module({
  providers: [ExaminationsResolver, ExaminationsService],
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Examination]),
    TypeOrmModule.forFeature([Disease]),
    TypeOrmModule.forFeature([ExaminationDetail]),
    UsersModule,
    DiseasesModule,
    ExaminationDetailsModule,
  ],
})
export class ExaminationsModule {}
