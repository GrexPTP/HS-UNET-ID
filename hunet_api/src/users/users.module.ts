import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { RolesModule } from '../roles/roles.module';
import { Role } from '../roles/entities/role.entity';
import { City } from '../cities/entities/city.entity';

@Module({
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([City]),
    RolesModule,
  ],
})
export class UsersModule {}
