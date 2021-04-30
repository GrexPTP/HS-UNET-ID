import {Test, TestingModule} from '@nestjs/testing';
import {SchedulesService} from './schedules.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Schedule} from './entities/schedule.entity';
import {MockRepository} from '../mock-helper/mock.repository';

describe('SchedulesService', () => {
  let service: SchedulesService;
  let scheduleRespository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        {
          provide: getRepositoryToken(Schedule),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
    scheduleRespository = module.get(getRepositoryToken(Schedule));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
