import {Test, TestingModule} from '@nestjs/testing';
import {SchedulesResolver} from './schedules.resolver';
import {SchedulesService} from './schedules.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Schedule} from './entities/schedule.entity';
import {MockRepository} from '../mock-helper/mock.repository';

describe('SchedulesResolver', () => {
  let resolver: SchedulesResolver;
  let service: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesResolver,
        SchedulesService,
        {
          provide: getRepositoryToken(Schedule),
          useClass: MockRepository,
        },
      ],
    }).compile();

    resolver = module.get<SchedulesResolver>(SchedulesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
