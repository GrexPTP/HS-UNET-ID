import {Test, TestingModule} from '@nestjs/testing';

import {getRepositoryToken} from '@nestjs/typeorm';
import {MockRepository} from '../mock-helper/mock.repository';
import {UsersResolver} from './users.resolver';
import {UsersService} from './users.service';
import {User} from './entities/user.entity';
import {Role} from '../roles/entities/role.entity';
import {City} from '../cities/entities/city.entity';
import {RolesService} from '../roles/roles.service';
import * as faker from 'faker';
import {Repository} from 'typeorm';
import {UpdateUserDto} from './dto/update-user.dtb';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let roleRep: Repository<Role>;
  let cityRep: Repository<City>;
  let userRep: Repository<User>;
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        RolesService,
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useClass: MockRepository,
        },
        {
          provide: getRepositoryToken(City),
          useClass: MockRepository,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    userRep = module.get(getRepositoryToken(User));
    roleRep = module.get(getRepositoryToken(Role));
    cityRep = module.get(getRepositoryToken(City));
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe('current user', () => {
    it('get current user', async () => {
      const user = new User();
      user.id = faker.random.number();
      user.name = 'unit test';
      user.email = 'test@gmail.com';
      user.birthDate = new Date();
      user.phone = '0899467737';
      user.role = await roleRep.findOne(1);
      user.city = await cityRep.findOne(1);
      user.createdAt = new Date();
      user.updatedAt = new Date();
      const result = resolver.findOne(user);
      expect(result).toEqual(user);
    });
  });
  describe('update user', async () => {
    const id = faker.random.number();
    const name = 'update test name';
    const updateInputUser: UpdateUserDto = {
      id,
      name,
    };
    const updateUser = new User();
    updateUser.id = id;
    updateUser.name = updateInputUser.name;
    const updateUserServiceSpy = jest
      .spyOn(service, 'update')
      .mockResolvedValue(updateUser);
    const result = resolver.updateUser(updateInputUser);
    expect(updateUserServiceSpy).toHaveBeenCalledWith(updateInputUser);
    expect(result).toEqual(updateInputUser);
  });
});
