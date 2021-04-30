import {Test, TestingModule} from '@nestjs/testing';
import {PermissionsResolver} from './permissions.resolver';
import {PermissionsService} from './permissions.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {MockRepository} from '../mock-helper/mock.repository';
import {Permission} from './entities/permission.entity';

describe('PermissionsResolver', () => {
  let resolver: PermissionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsResolver,
        PermissionsService,
        {
          provide: getRepositoryToken(Permission),
          useClass: MockRepository,
        },
      ],
    }).compile();

    resolver = module.get<PermissionsResolver>(PermissionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
