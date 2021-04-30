import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { City } from '../cities/entities/city.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MockRepository } from '../mock-helper/mock.repository';
import { Repository } from 'typeorm';
import * as faker from 'faker';
import { UpdateUserDto } from './dto/update-user.dtb';
describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let roleRep: Repository<Role>;
  let cityRep: Repository<City>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
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

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
    roleRep = module.get(getRepositoryToken(Role));
    cityRep = module.get(getRepositoryToken(City));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create user', () => {
    it('create user with correct params', async () => {
      const birthDate = new Date();
      const createUserInput: CreateUserDto = {
        birthDate: birthDate,
        cityId: 1,
        email: 'test@gmail.com',
        gender: 'male',
        name: 'unit test',
        password: '123456',
        phone: '089946737',
        roleId: 1,
        username: 'test',
      };

      const createdUser = new User();
      createdUser.email = createUserInput.email;
      createdUser.birthDate = createUserInput.birthDate;
      createdUser.name = createUserInput.name;
      createdUser.gender = createUserInput.gender;
      createdUser.phone = createUserInput.phone;
      createdUser.username = createUserInput.username;
      createdUser.password = createUserInput.password;
      const role = await roleRep.findOne(createUserInput.roleId);
      const city = await cityRep.findOne(createUserInput.cityId);
      createdUser.role = role;
      createdUser.city = city;

      const savedUser = new User();
      savedUser.id = faker.random.number();
      savedUser.email = createUserInput.email;
      savedUser.birthDate = createUserInput.birthDate;
      savedUser.name = createUserInput.name;
      savedUser.gender = createUserInput.gender;
      savedUser.phone = createUserInput.phone;
      savedUser.username = createUserInput.username;
      savedUser.password = createUserInput.password;
      savedUser.role = role;
      savedUser.city = city;
      savedUser.createdAt = new Date();
      savedUser.updatedAt = new Date();

      const userRepositorySaveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(savedUser);
      const user = await service.create(createUserInput);

      expect(userRepositorySaveSpy).toBeCalledWith(createdUser);
      expect(user).toEqual(savedUser);
    });

    // it('create user with wrong params', () => {
    //
    // });
  });
  describe('update user', () => {
    it('update user with right params', async () => {
      const id = faker.random.number();
      const name = 'unit test edit';
      const updateUserInput: UpdateUserDto = {
        id,
        name,
      };
      const birthDate = new Date();
      const createUserInput: CreateUserDto = {
        birthDate: birthDate,
        cityId: 1,
        email: 'test@gmail.com',
        gender: 'male',
        name: 'unit test',
        password: '123456',
        phone: '089946737',
        roleId: 1,
        username: 'test',
      };
      const existingUser = new User();
      const role = await roleRep.findOne(createUserInput.roleId);
      const city = await cityRep.findOne(createUserInput.cityId);
      existingUser.id = faker.random.number();
      existingUser.email = createUserInput.email;
      existingUser.birthDate = createUserInput.birthDate;
      existingUser.name = createUserInput.name;
      existingUser.gender = createUserInput.gender;
      existingUser.phone = createUserInput.phone;
      existingUser.username = createUserInput.username;
      existingUser.password = createUserInput.password;
      existingUser.role = role;
      existingUser.city = city;
      existingUser.createdAt = new Date();
      existingUser.updatedAt = new Date();

      const newUser = new User();
      newUser.id = existingUser.id;
      newUser.email = existingUser.email;
      newUser.birthDate = existingUser.birthDate;
      newUser.name = name;
      newUser.gender = existingUser.gender;
      newUser.phone = existingUser.phone;
      newUser.username = existingUser.username;
      newUser.password = existingUser.password;
      newUser.role = existingUser.role;
      newUser.city = existingUser.city;
      newUser.createdAt = existingUser.createdAt;
      newUser.updatedAt = existingUser.updatedAt;

      const savedUser = new User();
      savedUser.id = newUser.id;
      savedUser.email = newUser.email;
      savedUser.birthDate = newUser.birthDate;
      savedUser.name = newUser.name;
      savedUser.gender = newUser.gender;
      savedUser.phone = newUser.phone;
      savedUser.username = newUser.username;
      savedUser.password = newUser.password;
      savedUser.role = newUser.role;
      savedUser.city = newUser.city;
      savedUser.createdAt = newUser.createdAt;
      savedUser.updatedAt = newUser.updatedAt;

      const userRepositoryFindOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(existingUser);
      const userRepositorySaveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(savedUser);
      const user = await service.update(id, updateUserInput);

      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith(id);
      expect(userRepositorySaveSpy).toHaveBeenCalledWith(newUser);
      expect(user).toEqual(savedUser);
    });
  });
});
