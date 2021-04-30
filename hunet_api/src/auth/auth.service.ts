import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {Auth} from './entities/auth.entity';
import {User} from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
  ) {
  }

  async validateUser(
      username: string,
    passwordString: string,
    facebookId: string,
  ): Promise<any> {
    if (username) {
      const user = await this.usersService.findOne(null, username, null);
      if (user) {
        const isMatch = await bcrypt.compare(passwordString, user.password);
        if (isMatch) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    }
    if (facebookId) {
      const user = await this.usersService.findOne(null, null, facebookId);
      if (user) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
  async login(username: string, password: string, facebookId: string) {
    let user: User = null;
    if (facebookId) {
      user = await this.validateUser(null, null, facebookId);
    } else {
      user = await this.validateUser(username, password, null);
    }
    if (user) {
      user.password = null;
      return {
        access_token: this.jwtService.sign(user),
        message: 'Login success',
      };
    } else {
      return {
        access_token: null,
        message: 'Login failed',
      };
    }
  }

  async signup(createUserDto: CreateUserDto): Promise<Auth> {
    const user = await this.usersService.create(createUserDto);
    const { password, ...result } = user;

    return {
      token: this.jwtService.sign(result),
      message: 'Login success',
    };
  }
}
