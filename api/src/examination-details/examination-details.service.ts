import { Injectable } from '@nestjs/common';
import { CreateExaminationDetailInput } from './dto/create-examination-detail.input';
import { UpdateExaminationDetailInput } from './dto/update-examination-detail.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ExaminationDetail } from './entities/examination-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExaminationDetailsService {
  constructor(
    @InjectRepository(ExaminationDetail)
    private examinationDetailsRepository: Repository<ExaminationDetail>,
  ) {}
  create(createExaminationDetailInput: CreateExaminationDetailInput) {
    return 'This action adds a new examinationDetail';
  }

  findAll() {
    return `This action returns all examinationDetails`;
  }

  findOne(id: number): Promise<ExaminationDetail> {
    return this.examinationDetailsRepository.findOne(id);
  }

  update(
    id: number,
    updateExaminationDetailInput: UpdateExaminationDetailInput,
  ) {
    return `This action updates a #${id} examinationDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} examinationDetail`;
  }
}
