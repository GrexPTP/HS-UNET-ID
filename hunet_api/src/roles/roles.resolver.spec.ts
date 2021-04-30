import { Test, TestingModule } from '@nestjs/testing';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '../mock-helper/mock.repository';
import { Role } from './entities/role.entity';

describe('RolesResolver', () => {
  let resolver: RolesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesResolver,
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useClass: MockRepository,
        },
      ],
    }).compile();

    resolver = module.get<RolesResolver>(RolesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
