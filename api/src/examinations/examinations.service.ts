import {Injectable} from '@nestjs/common';
import {CreateExaminationInput} from './dto/create-examination.input';
import {UpdateExaminationInput} from './dto/update-examination.input';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../users/entities/user.entity';
import {Connection, Repository} from 'typeorm';
import {Examination} from './entities/examination.entity';
import {Disease} from '../diseases/entities/disease.entity';
import {PaginationDto} from '../pagination/dto/pagination.dto';
import {ExaminationsPaginationResultDto} from '../pagination/dto/examinations-pagination-result.dto';
import {ExaminationDetail} from '../examination-details/entities/examination-detail.entity';

@Injectable()
export class ExaminationsService {
  constructor(
      private connection: Connection,
      @InjectRepository(User)
      private usersRepository: Repository<User>,
      @InjectRepository(Examination)
      private examinationsRepository: Repository<Examination>,
      @InjectRepository(Disease)
    private diseasesRepository: Repository<Disease>,
    @InjectRepository(ExaminationDetail)
    private examinationDetailsRepository: Repository<ExaminationDetail>,
  ) {}
  async create(
    createExaminationInput: CreateExaminationInput,
  ): Promise<Examination> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const examination = new Examination();
      const patient = await this.usersRepository.findOne(
        createExaminationInput.patientId,
      );
      const disease = await this.diseasesRepository.findOne({
        slug: createExaminationInput.diseaseName,
      });
      const doctor = await this.usersRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect('user.role', 'role')
          .where('role.slug = :slug', {slug: 'doctor'})
          .orderBy('RAND()')
        .getOne();
      examination.patient = patient;
      examination.doctor = doctor;
      examination.customerDescription =
        createExaminationInput.customerDescription;
      examination.image = createExaminationInput.image;
      examination.resultImage = createExaminationInput.resultImage;
      examination.disease = disease;
      examination.status = createExaminationInput.status;
      await this.examinationsRepository.save(examination);
      const predict = JSON.parse(createExaminationInput.predict);
      for (const item of Object.entries(predict)) {
        const examinationDetail = new ExaminationDetail();
        examinationDetail.percentage = Number(item[1]);
        const disease = await this.diseasesRepository.findOne({
          slug: item[0].toString(),
        });
        examinationDetail.disease = disease;
        examinationDetail.examination = examination;
        await this.examinationDetailsRepository.save(examinationDetail);
      }
      await queryRunner.commitTransaction();
      return examination;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(
    user: User,
    pagination: PaginationDto,
  ): Promise<ExaminationsPaginationResultDto> {
    const totalCount = user.examined ? user.examined.length : 0;
    const examinations = await this.examinationsRepository
      .createQueryBuilder('examination')
      .where('patient_id = :id', { id: user.id })
      .orderBy('examination.createdAt', pagination.order)
      .skip((pagination.page - 1) * pagination.limit)
      .take(pagination.limit)
      .leftJoinAndSelect('examination.disease', 'disease')
      .leftJoinAndSelect(
        'examination.examinationDetails',
        'examination_details',
      )
      .leftJoinAndSelect('examination_details.disease', 'disease1')
      .leftJoinAndSelect('examination.patient', 'patient')
      .leftJoinAndSelect('examination.doctor', 'doctor')
      .getMany();
    return {
      totalCount,
      page: pagination.page,
      limit: pagination.limit,
      data: examinations,
    };
  }

  async findOne(id: number): Promise<Examination> {
    const examination = await this.examinationsRepository
      .createQueryBuilder('examination')
      .where('examination.id = :id', { id: id })
      .leftJoinAndSelect('examination.disease', 'disease')
      .leftJoinAndSelect(
        'examination.examinationDetails',
        'examination_details',
      )
      .leftJoinAndSelect('examination_details.disease', 'disease1')
      .leftJoinAndSelect('examination.patient', 'patient')
      .leftJoinAndSelect('examination.doctor', 'doctor')
      .getOne();
    return examination;
  }

  async update(
    id: number,
    updateExaminationInput: UpdateExaminationInput,
  ): Promise<Examination> {
    const examination = await this.examinationsRepository.findOne(id);
    examination.status = updateExaminationInput.status;
    return this.examinationsRepository.save(examination);
  }

  async remove(id: number) {
    await this.examinationsRepository.delete(id);
  }
}
