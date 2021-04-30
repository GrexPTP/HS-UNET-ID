import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ExaminationDetailsService } from './examination-details.service';
import { ExaminationDetail } from './entities/examination-detail.entity';
import { CreateExaminationDetailInput } from './dto/create-examination-detail.input';
import { UpdateExaminationDetailInput } from './dto/update-examination-detail.input';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Disease } from '../diseases/entities/disease.entity';
import e from 'express';

@UseGuards(GqlAuthGuard)
@Resolver(() => ExaminationDetail)
export class ExaminationDetailsResolver {
  constructor(
    private readonly examinationDetailsService: ExaminationDetailsService,
  ) {}

  // @Mutation(() => ExaminationDetail)
  // createExaminationDetail(
  //   @Args('createExaminationDetailInput')
  //   createExaminationDetailInput: CreateExaminationDetailInput,
  // ) {
  //   return this.examinationDetailsService.create(createExaminationDetailInput);
  // }
  //
  // @Query(() => [ExaminationDetail], { name: 'examinationDetails' })
  // findAll() {
  //   return this.examinationDetailsService.findAll();
  // }

  @Query(() => ExaminationDetail, { name: 'examinationDetail' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const examinationDetail = await this.examinationDetailsService.findOne(id);
    return examinationDetail;
  }

  // @Mutation(() => ExaminationDetail)
  // updateExaminationDetail(
  //   @Args('updateExaminationDetailInput')
  //   updateExaminationDetailInput: UpdateExaminationDetailInput,
  // ) {
  //   return this.examinationDetailsService.update(
  //     updateExaminationDetailInput.id,
  //     updateExaminationDetailInput,
  //   );
  // }
  //
  // @Mutation(() => ExaminationDetail)
  // removeExaminationDetail(@Args('id', { type: () => Int }) id: number) {
  //   return this.examinationDetailsService.remove(id);
  // }
  @ResolveField('disease', () => Disease)
  async disease(@Parent() examinationDetail: ExaminationDetail) {
    const { disease } = examinationDetail;
    return disease;
  }
}
