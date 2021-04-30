import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dtb';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Role} from '../roles/entities/role.entity';
import {City} from '../cities/entities/city.entity';
import {PaginationDto} from '../pagination/dto/pagination.dto';
import {UsersPaginationResultDto} from '../pagination/dto/users-pagination-result.dto';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
      @InjectRepository(Role)
      private rolesRepository: Repository<Role>,
      @InjectRepository(City)
      private citiesRepository: Repository<City>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.phone = createUserDto.phone;
    user.gender = createUserDto.gender;
    user.birthDate = createUserDto.birthDate;
    user.facebookId = createUserDto.facebookId;
    user.role = await this.rolesRepository.findOne(createUserDto.roleId);
    user.city = await this.citiesRepository.findOne(createUserDto.cityId);
    return this.usersRepository.save(user);
  }
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(id: number, username: string, facebookId: string): Promise<User> {
    if (id) {
      return this.usersRepository.findOne(id);
    } else if (username) {
      return this.usersRepository.findOne({ username });
    } else if (facebookId) {
      return this.usersRepository.findOne({ facebookId });
    }
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updateUser = await this.usersRepository.findOne(id);
    updateUser.name = updateUserDto.name ?? updateUser.name;
    updateUser.phone = updateUserDto.phone ?? updateUser.phone;
    updateUser.email = updateUserDto.email ?? updateUser.email;
    updateUser.password = updateUserDto.password ?? updateUser.password;
    updateUser.birthDate = updateUserDto.birthDate ?? updateUser.birthDate;
    updateUser.role = updateUserDto.roleId
      ? await this.rolesRepository.findOne(updateUserDto.roleId)
      : updateUser.role;
    updateUser.city = updateUserDto.cityId
      ? await this.citiesRepository.findOne(updateUserDto.cityId)
      : updateUser.city;
    return this.usersRepository.save(updateUser);
  }

  /**
   * This function will be tested later
   * @param id userid
   * @param path image path
   */
  async updateProfileImage(id: number, path: string) {
    const user = await this.usersRepository.findOne(id);
    user.profileImage = path;
    await this.usersRepository.save(user);
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async oauthFind(profile): Promise<User> {
    const user = await this.usersRepository.findOne({ facebookId: profile.id });
    return user;
  }
  async getDoctors(
    pagination: PaginationDto,
  ): Promise<UsersPaginationResultDto> {
    const doctorRole = await this.rolesRepository.findOne({ slug: 'doctor' });
    const totalCount = await this.usersRepository.count({
      where: {
        role: doctorRole,
      },
    });
    const curr = new Date(); // get current date
    const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day +
    const firstDay = new Date(curr.setDate(first));
    firstDay.setUTCHours(0, 0, 0, 0);
    const lastDay = new Date(curr.setDate(last));
    lastDay.setUTCHours(23, 59, 59, 999);
    const doctors = await this.usersRepository
      .createQueryBuilder('user')
      .where('role_id = :role_id', { role_id: doctorRole.id })
      .orderBy('user.createdAt', pagination.order)
      .skip((pagination.page - 1) * pagination.limit)
      .take(pagination.limit)
      .leftJoinAndSelect('user.schedules', 'schedules')
      .andWhere('schedules.startDate >= :first', {
        first: firstDay.toISOString(),
      })
      .andWhere('schedules.startDate < :last', {
        last: lastDay.toISOString(),
      })
      .andWhere('schedules.status = :status', { status: 1 })
      .getMany();

    return {
      totalCount,
      page: pagination.page,
      limit: pagination.limit,
      data: doctors,
    };
  }
}
