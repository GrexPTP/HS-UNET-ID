import { Injectable } from '@nestjs/common';
import { CreateDiseaseInput } from './dto/create-disease.input';
import { UpdateDiseaseInput } from './dto/update-disease.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Disease } from './entities/disease.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { DiseasesPaginationResultDto } from '../pagination/dto/diseases-pagination-result.dto';

@Injectable()
export class DiseasesService {
  constructor(
    @InjectRepository(Disease)
    private diseasesRepository: Repository<Disease>,
  ) {}
  create(createDiseaseInput: CreateDiseaseInput) {
    return 'This action adds a new disease';
  }

  async findAll(
    pagination: PaginationDto,
  ): Promise<DiseasesPaginationResultDto> {
    if (pagination) {
      const totalCount = await this.diseasesRepository.count();
      const appointments = await this.diseasesRepository
        .createQueryBuilder()
        .orderBy('created_at', pagination.order)
        .skip((pagination.page - 1) * pagination.limit)
        .take(pagination.limit)
        .getMany();
      return {
        totalCount,
        page: pagination.page,
        limit: pagination.limit,
        data: appointments,
      };
    }
    return {
      data: await this.diseasesRepository.find(),
    };
  }

  findOne(id: number): Promise<Disease> {
    return this.diseasesRepository.findOne(id);
  }

  update(id: number, updateDiseaseInput: UpdateDiseaseInput) {
    return `This action updates a #${id} disease`;
  }

  remove(id: number) {
    return `This action removes a #${id} disease`;
  }
}
