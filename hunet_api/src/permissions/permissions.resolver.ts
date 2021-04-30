import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/constants';
import { User } from '../users/entities/user.entity';
@UseGuards(GqlAuthGuard)
@Resolver(() => Permission)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) {}

  // @Mutation(() => Permission)
  // createPermission(
  //   @Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
  // ) {
  //   return this.permissionsService.create(createPermissionInput);
  // }

  @Query(() => [Permission], { name: 'permissions' })
  findAll(@CurrentUser() user: User) {
    return user.role.permissions;
  }

  @Query(() => Permission, { name: 'permission' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.permissionsService.findOne(id);
  }

  // @Mutation(() => Permission)
  // updatePermission(
  //   @Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput,
  // ) {
  //   return this.permissionsService.update(
  //     updatePermissionInput.id,
  //     updatePermissionInput,
  //   );
  // }
  //
  // @Mutation(() => Permission)
  // removePermission(@Args('id', { type: () => Int }) id: number) {
  //   return this.permissionsService.remove(id);
  // }
}
