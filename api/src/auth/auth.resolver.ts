import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {Auth} from './entities/auth.entity';
import {CreateUserDto} from '../users/dto/create-user.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation(() => Auth)
  async login(
      @Args('username', {nullable: true}) username: string,
      @Args('password', {nullable: true}) password: string,
      @Args('facebookId', {nullable: true}) facebookId: string,
  ) {
    const result = await this.authService.login(username, password, facebookId);
    const auth = new Auth();
    auth.token = result.access_token;
    auth.message = result.access_token ? 'Login successfully' : 'Login failed';
    return auth;
  }

  @Mutation(() => Auth)
  async signup(
    @Args('signUpInput') signUpInputDto: CreateUserDto,
  ): Promise<Auth> {
    return this.authService.signup(signUpInputDto);
  }
}
