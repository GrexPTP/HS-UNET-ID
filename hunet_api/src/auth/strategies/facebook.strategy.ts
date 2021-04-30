import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { PassportStrategy } from '@nestjs/passport';
@Injectable()
export class FacebookStrategy extends PassportStrategy(
  FacebookTokenStrategy,
  'facebook-token',
) {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: '799520370645414',
      clientSecret: '5f83a9b5327d69cbbafc730d73ce9298',
      fbGraphVersion: 'v3.0',
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const user = await this.usersService.oauthFind(profile);
    return done(null, user);
  }
}
