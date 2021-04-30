import { Injectable } from '@nestjs/common';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}
  create(createPermissionInput: CreatePermissionInput) {
    return 'This action adds a new permission';
  }

  findAll(): Promise<Permission[]> {
    return this.permissionsRepository.find();
  }

  findOne(id: number): Promise<Permission> {
    return this.permissionsRepository.findOne(id);
  }

  update(id: number, updatePermissionInput: UpdatePermissionInput) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
