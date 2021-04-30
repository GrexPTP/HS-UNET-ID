import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ExaminationsService } from './examinations.service';
import { Examination } from './entities/examination.entity';
import { CreateExaminationInput } from './dto/create-examination.input';
import { UpdateExaminationInput } from './dto/update-examination.input';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/constants';
import { User } from '../users/entities/user.entity';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { ExaminationsPaginationResultDto } from '../pagination/dto/examinations-pagination-result.dto';
import { Disease } from '../diseases/entities/disease.entity';
@UseGuards(GqlAuthGuard)
@Resolver(() => Examination)
export class ExaminationsResolver {
  constructor(private readonly examinationsService: ExaminationsService) {}

  @Mutation(() => Examination)
  createExamination(
    @Args('createExaminationInput')
    createExaminationInput: CreateExaminationInput,
  ) {
    return this.examinationsService.create(createExaminationInput);
  }

  @Query(() => ExaminationsPaginationResultDto, { name: 'examinations' })
  async findAll(
    @CurrentUser() user: User,
    @Args('pagination', { nullable: true }) pagination: PaginationDto,
  ): Promise<ExaminationsPaginationResultDto> {
    if (pagination) {
      return this.examinationsService.findAll(user, pagination);
    } else {
      return {
        data: user.examined,
      };
    }
  }

  @Query(() => Examination, { name: 'examination' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.examinationsService.findOne(id);
  }

  @Mutation(() => Examination)
  updateExamination(
    @Args('updateExaminationInput')
    updateExaminationInput: UpdateExaminationInput,
  ) {
    return this.examinationsService.update(
      updateExaminationInput.id,
      updateExaminationInput,
    );
  }

  @Mutation(() => Examination)
  removeExamination(@Args('id', { type: () => Int }) id: number) {
    return this.examinationsService.remove(id);
  }
  @ResolveField('disease', () => Disease)
  async disease(@Parent() examination: Examination) {
    const { disease } = examination;
    return disease;
  }
}
