import {CreateScheduleInput} from './dto/create-schedule.input';
import {UpdateScheduleInput} from './dto/update-schedule.input';
import {Injectable} from '@nestjs/common';

@Injectable()
export class SchedulesService {
  constructor() {
  }

  create(createScheduleInput: CreateScheduleInput) {
    return 'This action adds a new schedule';
  }

  findAll() {
    return `This action returns all schedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleInput: UpdateScheduleInput) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
