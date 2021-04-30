import {Module} from '@nestjs/common';
import {SchedulesService} from './schedules.service';
import {SchedulesResolver} from './schedules.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Schedule} from './entities/schedule.entity';

@Module({
  providers: [SchedulesResolver, SchedulesService],
  imports: [TypeOrmModule.forFeature([Schedule])],
  exports: [SchedulesService],
})
export class SchedulesModule {
}
