import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesResolver } from './cities.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';

@Module({
  providers: [CitiesResolver, CitiesService],
  imports: [TypeOrmModule.forFeature([City])],
  exports: [CitiesService],
})
export class CitiesModule {}
