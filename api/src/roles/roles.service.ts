import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import slugify from 'slugify';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  create(createRoleInput: CreateRoleInput): Promise<Role> {
    const role = new Role();
    role.name = createRoleInput.name;
    role.slug = slugify(createRoleInput.slug);
    return this.rolesRepository.save(role);
  }

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  findOne(id: number): Promise<Role> {
    return this.rolesRepository.findOne(id);
  }

  async update(id: number, updateRoleInput: UpdateRoleInput): Promise<Role> {
    const role = await this.rolesRepository.findOne(id);
    role.name = updateRoleInput.name;
    role.slug = slugify(updateRoleInput.slug);
    return this.rolesRepository.save(role);
  }

  async remove(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}
