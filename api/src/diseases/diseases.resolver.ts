import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DiseasesService } from './diseases.service';
import { Disease } from './entities/disease.entity';
import { CreateDiseaseInput } from './dto/create-disease.input';
import { UpdateDiseaseInput } from './dto/update-disease.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { DiseasesPaginationResultDto } from '../pagination/dto/diseases-pagination-result.dto';
@UseGuards(GqlAuthGuard)
@Resolver(() => Disease)
export class DiseasesResolver {
  constructor(private readonly diseasesService: DiseasesService) {}

  // @Mutation(() => Disease)
  // createDisease(
  //   @Args('createDiseaseInput') createDiseaseInput: CreateDiseaseInput,
  // ) {
  //   return this.diseasesService.create(createDiseaseInput);
  // }

  @Query(() => DiseasesPaginationResultDto, { name: 'diseases' })
  findAll(@Args('pagination', { nullable: true }) pagination: PaginationDto) {
    return this.diseasesService.findAll(pagination);
  }

  @Query(() => Disease, { name: 'disease' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.diseasesService.findOne(id);
  }

  // @Mutation(() => Disease)
  // updateDisease(
  //   @Args('updateDiseaseInput') updateDiseaseInput: UpdateDiseaseInput,
  // ) {
  //   return this.diseasesService.update(
  //     updateDiseaseInput.id,
  //     updateDiseaseInput,
  //   );
  // }
  //
  // @Mutation(() => Disease)
  // removeDisease(@Args('id', { type: () => Int }) id: number) {
  //   return this.diseasesService.remove(id);
  // }
}
