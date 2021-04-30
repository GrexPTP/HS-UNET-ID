import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver,} from '@nestjs/graphql';
import {User} from './entities/user.entity';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dtb';
import {RolesService} from '../roles/roles.service';
import {Role} from '../roles/entities/role.entity';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '../auth/guards/gql-auth.guard';
import {CurrentUser} from '../auth/constants';
import {FileUpload} from 'graphql-upload';
import {GraphQLUpload} from 'apollo-server-express';
import {UploadResultDto} from './dto/upload-result.dto';
import {Storage} from '@google-cloud/storage';
import {City} from '../cities/entities/city.entity';
import {UsersPaginationResultDto} from '../pagination/dto/users-pagination-result.dto';
import {PaginationDto} from '../pagination/dto/pagination.dto';

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(
      private readonly usersService: UsersService,
      private readonly rolesService: RolesService,
  ) {
  }

  @Mutation(() => User)
  createUser(@Args('createUser') createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@CurrentUser() user: User) {
    user.birthDate = new Date(user.birthDate);
    user.createdAt = new Date(user.createdAt);
    user.updatedAt = new Date(user.updatedAt);
    return user;
  }

  @Query(() => UsersPaginationResultDto, {name: 'doctors'})
  getDoctors(
      @Args('pagination', {nullable: true}) pagination: PaginationDto,
  ) {
    return this.usersService.getDoctors(pagination);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUser') updateUser: UpdateUserDto) {
    return this.usersService.update(updateUser.id, updateUser);
  }

  @Mutation(() => User)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
  @Mutation(() => UploadResultDto)
  async uploadProfileImage(
    @CurrentUser() user: User,
    @Args('image', { type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<UploadResultDto> {
    const bucketName = 'profile-image-hunet-1';
    const storage = new Storage({
      projectId: 'inner-rhythm-306513',
      keyFilename: './google_service.json',
    });
    const splitName = filename.split('.');
    const name =
      '_' + Math.random().toString(36).substr(2, 32) + '.' + splitName[1];
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(name);

    const publicPath = `https://storage.googleapis.com/${bucketName}/${name}`;
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(file.createWriteStream())
        .on('finish', () => {
          storage.bucket(bucketName).file(name).makePublic();
          this.usersService.updateProfileImage(user.id, publicPath);
          return resolve({
            path: publicPath,
            message: 'Upload Successful',
          });
        })
        .on('error', (e) =>
          reject({
            path: null,
            message: e.message,
          }),
        ),
    );
  }
  @ResolveField('role', () => Role)
  async role(@Parent() user: User) {
    const { role } = user;
    return role;
  }

  @ResolveField('city', () => City)
  async city(@Parent() user: User) {
    const { city } = user;
    return city;
  }
}
